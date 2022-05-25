import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ExternalServiceService } from 'src/app/Services/external-service.service';
import { PreferencesManagementService } from 'src/app/Services/preferences-management.service';


import Swal from 'sweetalert2'

@Component({
    selector: 'app-browser',
    templateUrl: './browser.component.html',
    styleUrls: ['./browser.component.css']
})
export class BrowserComponent implements OnInit {

    title: string = 'Buscar Licitaciones';
    categoriesList: any[] = [];
    word: string = '';
    words: string[] = []
    eventsSubject: Subject<any> = new Subject<any>();

    constructor(private route: ActivatedRoute, private router: Router, private externalService: ExternalServiceService, private preferenceService: PreferencesManagementService) {
    }

    ngOnInit(): void {
    }

    add(form: NgForm) {
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
            this.words = []
            this.categoriesList.map((item: any) => {
                this.preferenceService.getWords(Number(item.category_id))
                    .subscribe((data: any) => {
                        if (data.code > 0) {
                            let items: any[] = data.data.rows
                            for (let i = 0; i < items.length; i++)
                                this.words.push(items[i].word)
                        } else {
                            console.error(data.msg)
                        }
                    })
            })
        }
        // search by words 
        Swal.fire(
            'Bucando...',
            'Por favor, mientras el sistema realiza la busqueda'
        )
        Swal.showLoading()
        this.externalService.searchTender(this.words)
            .subscribe((data: any) => {
                if (data.code > 0) {
                    localStorage.setItem('tenderList', data.data)
                    this.router.navigateByUrl('/Tenders');
                    Swal.close();
                } else {
                    console.error(data)
                    Swal.fire(
                        'Error',
                        'Ha ocurrido un error por favor contacte al administrador!',
                        'error'
                    )
                }
            })
    }

    setCategories(categories: any[]) {
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
