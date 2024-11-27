import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/Product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  productId: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder // Instanciando FormBuilder
  ) {

    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id') as string;

    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(
        (product: Product) => {
          this.productForm.patchValue(product);
        },
        error => {
          console.error('Erro ao carregar o produto:', error);
        }
      );
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      if (this.productId) {
        this.productService.updateProduct(this.productId, productData).subscribe(() => {
          console.log('Produto atualizado');
        });
      } else {
        this.productService.createProduct(productData).subscribe(() => {
          console.log('Produto criado');
        });
      }
    }
  }
}
