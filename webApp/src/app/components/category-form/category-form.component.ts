import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/Category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})

export class CategoryFormComponent implements OnInit {
  @Input() btnText!: string
  @Output() onSubmit = new EventEmitter<Category>();
  categoryForm!: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
    })
  }

  get name() {
    return this.categoryForm.get('name')!;
  }

  submit() {
    if (this.categoryForm.invalid) {
      return
    }
    this.onSubmit.emit(this.categoryForm.value)
  }
}
