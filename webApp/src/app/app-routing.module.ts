import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { NewCategoryComponent } from './components/pages/new-category/new-category.component';
import { NewProductsComponent } from './components/pages/new-products/new-products.component';
import { ProductFormComponent } from './components/pages/product-form/product-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new-category', component: NewCategoryComponent },
  { path: 'new-product', component: NewProductsComponent },
  { path: 'product-form', component: ProductFormComponent },
  { path: 'product-form/:productId', component: ProductFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
