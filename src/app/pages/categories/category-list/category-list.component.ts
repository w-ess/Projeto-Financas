import { Component, OnInit } from '@angular/core';

import { Category } from '../shared/category-module';
import { CategoryService } from '../shared/category.service';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert('erro ao carregar lista')
    );
  }

  deleteCategory(category) {
    const mustDelete = confirm('Deseja realmente excluir este item?');

    if (mustDelete) {
      this.categoryService.delete(category.id).subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        () => this.categories = this.categories.filter(element => element !== category),
        () => alert('erro ao tentar excluir!')
      );
    }
  }

}
