import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

  title:string='Buscar Licitaciones';
  categoriesList:[] = [];
  word:string='';
  words:string[]=[]

  constructor(private route: ActivatedRoute) { 
    this.getType()
  }

  ngOnInit(): void {
  }

  getType(){
    this.route.params.subscribe(parms => {
      if (parms['type'] == 'byCategory') {
        this.title='Buscar Licitaciones';
      } else if(parms['type'] == 'byWord') {
        this.title='Buscar Licitaciones por palabras claves';
      }
    })
  }

  add(form:NgForm){
    if (this.word != '') {
      this.words.push(this.word)
    }
    form.resetForm();
    this.word = ''
  }

  remove(index) {
    this.words.splice(index, 1)
  }

  search() {

  }

  setCategories(categories:any[]) {

  }
}
