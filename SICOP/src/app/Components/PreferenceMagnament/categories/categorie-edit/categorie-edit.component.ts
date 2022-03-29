import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/Models/category.model';
import { Word } from 'src/app/Models/word.model';
import { FavoriteInstitutionsManagementService } from 'src/app/Services/favorite-institutions-management.service';
import { PreferencesManagementService } from 'src/app/Services/preferences-management.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie-edit',
  templateUrl: './categorie-edit.component.html',
  styleUrls: ['./categorie-edit.component.css']
})
export class CategorieEditComponent implements OnInit {

  @ViewChild('modalClose') modelCloseBtn: ElementRef

  edit:boolean
  word:string = ''
  category: Category = new Category();

  words: Word[] = [];
  addedWord: string[];
  deletedWords: string[];

  constructor(private route: ActivatedRoute, private preferenceService: PreferencesManagementService, private institutionsService:FavoriteInstitutionsManagementService) { }

  ngOnInit(): void {
    this.route.params.subscribe(parms => {
      if (parms['id'] == 'new') {
        this.edit = false
      } else {
        this.edit = true
        this.category.category_id = parms['id']
        this.preferenceService.getWords(this.category.category_id)
          .subscribe((data:any) => {
            console.log(data.data.rows)
            this.words = data.data.rows
          })
        
      }
    })

    this.institutionsService.getInstitutions([{abbreviation: "BN", date_created: "2022-03-22T06:00:00.000Z", deleted: "0", institution_id: 1, legal_id: "1", name: "Banco Naciona"}])
      .subscribe((data:any) => {
        console.log(data)
    })
  }

  update() {
//this.preferenceService.updateCategory(this.category_id,)
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
    if (this.category.name != '') {
      // call a service to save

      // press close button
      let element: HTMLElement = document.getElementById('modalClose') as HTMLButtonElement;
      element.click();

      // go to categories
    }
  }

}
