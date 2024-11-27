import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/Category';
import { Product } from 'src/app/Product';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = { name: '', price: 0, categoryId: '', image: '' };
  categories: Category[] = [];
  productId: string | null = null;
  productForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });

    this.productId = this.route.snapshot.paramMap.get('productId');

    if (this.productId) {
      this.productService.getProducts().subscribe((products) => {
        this.product = products.find(p => p.id === this.productId) || {} as Product;
        this.productForm.setValue({
          name: this.product.name,
          price: this.product.price,
          categoryId: this.product.categoryId,
        });
      });
    } else {
      this.productService.createProduct(this.productForm.value).subscribe(
        (response) => {
          console.log('Produto cadastrado com sucesso:', response);
        },
        (error) => {
          console.error('Erro ao cadastrar produto:', error);
        }
      );
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productId) {
        this.productService.updateProduct(this.productId, this.productForm.value).subscribe(
          (response) => {
            alert('Produto atualizado com sucesso!');
          },
          (error) => {
            alert('Erro ao atualizar o produto');
          }
        );
      }
    } else {
      alert('Formulário inválido!');
    }
  }

  onSubmit(): void {
    console.log(this.productForm.value)
    console.log(this.productForm.get('name')?.value);
    this.productForm.updateValueAndValidity();
    this.saveProduct();
  }
}
