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
      image: ['']
    });
  }

  ngOnInit(): void {
    // Carregar categorias
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });

    // Obter o productId da URL
    this.productId = this.route.snapshot.paramMap.get('productId');

    if (this.productId) {
      // Verifica se o productId existe e busca o produto correspondente
      this.productService.getProducts().subscribe((products) => {
        this.product = products.find(p => p.id === this.productId) || {} as Product;

        if (this.product && this.product.id) {
        // Preenche o formulário com os dados do produto
          this.productForm.setValue({
            name: this.product.name,
            price: this.product.price,
            categoryId: this.product.categoryId,
            image: this.product.image || '' // Caso o campo image seja opcional
          });
        }
      });
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const productData: Product = this.productForm.value;

      if (this.productId) {
        // Se existe productId, é edição
        this.productService.updateProduct(this.productId, productData).subscribe(
          (response) => {
            alert('Produto atualizado com sucesso!');
            this.productForm.reset(); // Resetar o formulário após a atualização
          },
          (error) => {
            alert('Erro ao atualizar o produto');
            console.error(error);
          }
        );
      } else {
        // Se não existe productId, é cadastro
        this.productService.createProduct(productData).subscribe(
          (response) => {
            alert('Produto cadastrado com sucesso!');
            this.productForm.reset(); // Resetar o formulário após o cadastro
          },
          (error) => {
            alert('Erro ao cadastrar o produto');
            console.error(error);
          }
        );
      }
    } else {
      alert('Formulário inválido!');
    }
  }

  onSubmit(): void {
    console.log('Valores no submit:', this.productForm.value);
    this.saveProduct();
  }
}
