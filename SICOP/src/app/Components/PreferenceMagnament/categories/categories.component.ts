import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  categories: Category[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
