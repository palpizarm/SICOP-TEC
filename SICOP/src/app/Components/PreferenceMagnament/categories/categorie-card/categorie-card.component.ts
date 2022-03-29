import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/category.model';

@Component({
  selector: 'app-categorie-card',
  templateUrl: './categorie-card.component.html',
  styleUrls: ['./categorie-card.component.css']
})
export class CategorieCardComponent implements OnInit {

  @Input() category : Category;

  constructor(router:Router) { }

  ngOnInit(): void {
  }

}
