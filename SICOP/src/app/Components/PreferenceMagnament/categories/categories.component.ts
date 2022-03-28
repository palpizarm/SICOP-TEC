import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  categories: Category[] = [new Category(1,"Prueba de grupo 1", 1, 0 ,"02,02,2022"), 
                            new Category(2,"Prueba de grupo 2", 1, 0 ,"02,02,2022")
                          ]
  constructor() { }

  ngOnInit(): void {
  }

  new(){
    
  }

}
