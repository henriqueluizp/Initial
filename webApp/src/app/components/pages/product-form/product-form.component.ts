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
  productForm: FormGroup;
  categories: Category[] = [];
  product: Product = { name: '', price: 0, categoryId: '', image: '' };
  productId: string | null = null;
  selectedImage: string | null = null; // Armazena a imagem em base64

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      image: [''] // Mantém o campo de imagem
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });

    this.productId = this.route.snapshot.paramMap.get('productId');

    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe((product) => {
        this.product = product;
        this.productForm.setValue({
          name: this.product.name,
          price: this.product.price,
          categoryId: this.product.categoryId,
          image: '' // Campo de imagem é opcional e não é carregado no formulário
        });
      });
    }
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
        this.productForm.patchValue({ image: this.selectedImage });
      };
      reader.readAsDataURL(file);
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const productData: Product = {
        ...this.productForm.value,
        image: this.selectedImage || this.productForm.value.image // Usa a imagem selecionada ou mantém a existente
      };

      if (this.productId) {
        this.productService.updateProduct(this.productId, productData).subscribe(() => {
          alert('Produto atualizado com sucesso!');
          this.productForm.reset();
        });
      } else {
        this.productService.createProduct(productData).subscribe(() => {
          alert('Produto cadastrado com sucesso!');
          this.productForm.reset();
        });
      }
    } else {
      alert('Formulário inválido!');
    }
  }

  onSubmit(): void {
    this.saveProduct();
  }
}
