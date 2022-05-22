import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  title:string='Buscar Licitaciones';
  categoriesList:any[] = [];
  word:string='';
  words:string[]=[]
  eventsSubject: Subject<any> = new Subject<any>();

  constructor(private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
  }

  add(form:NgForm){
    if (this.word != '') {
      this.words.push(this.word)
    }
    form.resetForm();
    this.word = ''
  }

  remove(index) {
    let item = this.categoriesList.splice(index, 1)
    this.eventsSubject.next(item[0].category_id)
  }

  removeWord(index) {
    let item = this.words.splice(index, 1)
  }

  search() {
    // search by categories
    if (this.title == 'Buscar Licitaciones') {
      console.log(this.categoriesList)
    }
    // search by words 
    else {
      console.log(this.words)
    }
  }

  setCategories(categories:any[]) {
    this.categoriesList = categories
  }

  searchByWord() {
    this.title = 'Buscar Licitaciones por palabras claves'
  }

  searchByCategory() {
    this.title = 'Buscar Licitaciones'
  }

  cancelCategorySelection() {
    this.categoriesList = []
  }
}