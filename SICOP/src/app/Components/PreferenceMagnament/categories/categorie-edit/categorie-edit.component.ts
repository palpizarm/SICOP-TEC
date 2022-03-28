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

  word:string = ''
  words: Word[] = [new Word(1,'Software',1,'2/2/2022', 0),new Word(2,'Nube',1,'2/2/2022', 0),new Word(3,'Plataforma',1,'2/2/2022', 0)]
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(parms => {
      this.words
    })
  }

  update() {
    
  }

  remove(index:number) {
    this.words.splice(index, 1);
  }

  add(form:NgForm) {
    console.log(form.controls['word'])
    if (this.word != '') {
      this.words.push(new Word(1,this.word,1,'2/2/2022', 0))
    }
    form.resetForm();
    this.word = ''
  }

}
