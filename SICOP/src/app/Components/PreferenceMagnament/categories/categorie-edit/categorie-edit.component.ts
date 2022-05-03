import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/Models/category.model';
import { Word } from 'src/app/Models/word.model';
import { PreferencesManagementService } from 'src/app/Services/preferences-management.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie-edit',
  templateUrl: './categorie-edit.component.html',
  styleUrls: ['./categorie-edit.component.css']
})
export class CategorieEditComponent implements OnInit {

  @ViewChild('modalClose') modelCloseBtn: ElementRef

  edit: boolean
  word: string = ''
  category: Category;

  words: Word[] = [];
  addedWords: string[] = [];
  deletedWords: string[] = [];
  userType: number = 0

  constructor(private route: ActivatedRoute, private preferenceService: PreferencesManagementService, private router: Router) { }

  ngOnInit(): void {
    this.userType = Number(localStorage.getItem('roleID'))
    this.route.params.subscribe(parms => {
      if (parms['id'] == 'new') {
        this.edit = false
        this.category = new Category()
      } else {

        this.edit = true
        this.preferenceService.getCategoryById(parms['id'])
          .subscribe((data: any) => {
            this.category = data.data.rows[0]
            this.preferenceService.getWords(this.category.category_id)
              .subscribe((data: any) => {
                this.words = data.data.rows
              })
          })
      }
    })
  }

  update() {
    this.preferenceService.updateCategory(this.category.category_id,
      this.category.name,
      this.category.user_id,
      this.addedWords,
      this.deletedWords)
      .subscribe((data: any) => {
        Swal.fire({ text: 'Categoria actualizada', icon: 'success', confirmButtonText: 'Aceptar' })
        this.ngOnInit();
        this.addedWords = []
        this.deletedWords = []
        this.router.navigateByUrl(localStorage.getItem('roleID') == '3'?'/Categories':'/CategoriesList')
      })
  }

  remove(index: number, type) {
    switch (type) {
      case 'new': {
        this.deletedWords.push(this.words[index].word)
        this.words.splice(index, 1)
      }
      case 'added': {
        this.addedWords.splice(index, 1)
      }
    }

  }

  add(form: NgForm) {
    if (this.word != '') {
      this.addedWords.push(this.word)
    }
    form.resetForm();
    this.word = ''
  }

  // call a service to save a new category
  save(form: NgForm) {
    if (this.addedWords.length == 0) {
      Swal.fire({ text: 'Ingrese al menos una palabra dentro la categoria', icon: 'error', confirmButtonText: 'Aceptar' })
      return
    }
    if (this.category.name == '') {
      Swal.fire({ text: 'Ingrese el nombre de la categoria', icon: 'error', confirmButtonText: 'Aceptar' })
      return
    }
    if (this.userType == 3) {
      // call a service to save
      this.preferenceService.createCategory(this.category.name, parseInt(localStorage.getItem('userID')), this.addedWords)
        .subscribe((data: any) => {
          // press close button
          let element: HTMLElement = document.getElementById('modalClose') as HTMLButtonElement;
          element.click();
          // go to categories
          this.router.navigateByUrl('/Categories')
        })
    } else {
          // call a service to save
    this.preferenceService.createCategoryAdmin(this.category.name,this.addedWords)
    .subscribe((data:any) => {
        // press close button
        let element: HTMLElement = document.getElementById('modalClose') as HTMLButtonElement;
        element.click();
        // go to categories
        this.router.navigateByUrl('/CategoriesList')
    }) 
    }

  }

  goBack() {
    // go back to client page
    if (this.userType == 3) {
      this.router.navigateByUrl('/Categories')
    }
    // back to admin and mantaince page 
    else {
      this.router.navigateByUrl('/CategoriesList')
    }
  }


}
