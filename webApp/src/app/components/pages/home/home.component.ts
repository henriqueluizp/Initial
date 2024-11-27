import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importe o Router
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Product } from 'src/app/Product';
import { Category } from 'src/app/Category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  selectedCategory: string = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });

    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategory = selectElement.value;

    if (this.selectedCategory) {
      this.filteredProducts = this.products.filter(
        (product) => product.categoryId === this.selectedCategory
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  onDelete(productId: string | undefined): void {
    if (productId && confirm('Tem certeza de que deseja remover este produto?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        this.filteredProducts = this.filteredProducts.filter(
          (product) => product.id !== productId
        );
      });
    }
  }

  onEdit(productId: string | undefined): void {
    if (productId) {
      this.router.navigate(['/product-form', productId]);
    }
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Categoria não encontrada';
  }
}
