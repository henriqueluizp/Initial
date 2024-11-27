import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {
  btnText = "Adicionar Categoria"
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  async createHandler(category: Category) {
    this.categoryService.createCategory(category).subscribe({
      next: (response) => {
        alert("Categoria criada com sucesso");
      },
      error: (error) => {
        alert("Erro ao criar categoria");
      },
    });
  }
}
