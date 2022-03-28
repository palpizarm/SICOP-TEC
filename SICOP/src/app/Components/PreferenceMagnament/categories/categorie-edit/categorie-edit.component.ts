import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Word } from 'src/app/Models/word.model';

@Component({
  selector: 'app-categorie-edit',
  templateUrl: './categorie-edit.component.html',
  styleUrls: ['./categorie-edit.component.css']
})
export class CategorieEditComponent implements OnInit {

  edit:boolean

  categoryName:string = ''
  word:string = ''
  
  words: Word[] = [new Word(1,'Software',1,'2/2/2022', 0),new Word(2,'Nube',1,'2/2/2022', 0),new Word(3,'Plataforma',1,'2/2/2022', 0)]
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => {
      console.log(parms)
      if (parms['id'] == 'new') {
        this.edit = false
        console.log("TEST")
      } else {
        this.edit = true
        // call a service to get words
      }
    })
  }

  update() {
    
  }

  remove(index:number) {
    this.words.splice(index, 1);
  }

  add(form:NgForm) {
    if (this.word != '') {
      this.words.push(new Word(1,this.word,1,'2/2/2022', 0))
    }
    form.resetForm();
    this.word = ''
  }

  // call a service to save a new category
  save(form:NgForm) {
    if (this.categoryName != '') {
      // call a service to save

      // press close button
      let element: HTMLElement = document.getElementById('close-modal')[0] as HTMLElement;
      element.click();
    }
  }

}
