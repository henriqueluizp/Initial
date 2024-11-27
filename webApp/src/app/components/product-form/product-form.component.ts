import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/Category';
import { Product } from 'src/app/Product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = { name: '', price: 0, categoryId: '', image: '' };
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    if (this.product.name && this.product.price && this.product.categoryId) {
      this.productService.createProduct(this.product).subscribe(
        (response) => {
          console.log('Produto cadastrado com sucesso:', response);
        },
        (error) => {
          console.error('Erro ao cadastrar produto:', error);
        }
      );
    }
  }
}
