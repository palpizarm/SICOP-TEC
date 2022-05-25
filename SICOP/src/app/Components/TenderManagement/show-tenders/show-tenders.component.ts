import { Component, OnInit, ElementRef } from '@angular/core';
import { range } from 'rxjs';
import { TenderManagementService } from 'src/app/Services/tender-management.service';
import Swal from 'sweetalert2'
import { element } from 'protractor';
import { ThisReceiver } from '@angular/compiler';
import { FavoriteInstitutionsManagementService } from 'src/app/Services/favorite-institutions-management.service';

@Component({
    selector: 'app-show-tenders',
    templateUrl: './show-tenders.component.html',
    styleUrls: ['./show-tenders.component.css']
})
export class ShowTendersComponent implements OnInit {

    page: number = 1;

    userID: number = 0;

    tendersList: any = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

    favTendersList: any = [];
    filTendersList: any = [];

    selectedItem:any = {}
    cargado: boolean = false;

    //Doing
    byBudget: boolean = false;
    minBudget: number = 0;
    maxBudget: number = 300000000;

    //Doing
    byProcess: boolean = false;
    process:any = '-- Seleccione el tipo de procedimiento --';
    process_types = [
        'LICITACIÓN PÚBLICA NACIONAL',
        'LICITACIÓN PÚBLICA INTERNACIONAL',
        'LICITACIÓN ABREVIADA',
        'PROCEDIMIENTO POR PRINCIPIO',
        'CONTRATACIÓN DIRECTA',
        'CONTRATACIÓN ESPECIAL',
        'REMATE',
      ];
    //Doing
    byRegion: boolean = false;
    region:any;
    regions:any = ['San José', 'Alajuela', 'Heredia', 'Cartago', 'Puntarenas', 'Guanacaste', 'Limón', 'Fuera del país'];
    

    //Doing
    byDate: boolean = false;
    minDate: string = '2022-05-12T00:00:00.000Z';
    maxDate: string = '2022-06-15T00:00:00.000Z';

    //Doing
    byInstitution: boolean = false;
    institutions: any = [];
    institution:any;

    constructor(
        private _tenderService: TenderManagementService,
        private _favInstitutionsService: FavoriteInstitutionsManagementService
    ) { }

    ngOnInit(): void {
        this.userID = parseInt(localStorage.getItem('userID'));
        this.loadTenders();
        this.getDate();
        this.loadInstitutions();
    }

    getDate() {

        var date = new Date();
        var currentDate = date.toISOString().slice(0, 10);
        this.maxDate = currentDate;

        let subtractDays = function (pDate, days) {
            pDate.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));
            return pDate;
        }
        let start_date = subtractDays(date, 7).toISOString().slice(0, 10);
        this.minDate = start_date;

    }

    loadInstitutions() {
        this._favInstitutionsService.getAllInstitutions().subscribe(
            (data: any) => {
                this.institutions = data.data.rows;
                this.cargado = true;
            }
        )
    }

    loadFavTenders() {
        this._tenderService.getFavorites(this.userID).subscribe(
            (data: any) => {
                this.favTendersList = data.data.rows;

            }
        )
    }
    budgetValue = (value: string) => {
        let amount = value.split('[')[0];
        return parseInt(amount.replace(/\./g, ''));
    }

    loadFilTenders() {
        if (this.byBudget) {
            this.filTendersList = this.tendersList.filter(i => (this.budgetValue(i["budget"]) >= this.minBudget && this.budgetValue(i["budget"]) <= this.maxBudget));
        }
        if (this.byInstitution) {
            if (this.byBudget) {
                this.filTendersList = this.filTendersList.filter(i => i["institution_name"] == this.institution);
            }
            else {
                this.filTendersList = this.tendersList.filter(i => i["institution_name"] == this.institution);

            }
        }
        if (this.byProcess) {
            if (this.byBudget || this.byInstitution) {

                this.filTendersList = this.filTendersList.filter(i => (i["procedure_type"] === this.process))
            }
            else {
                this.filTendersList = this.tendersList.filter(i => (i["procedure_type"] === this.process))
            }
        }
        if (this.byRegion) {
            if (this.byBudget || this.byInstitution || this.byProcess) {
                this.filTendersList = this.filTendersList.filter(i => (i["regions"].some(t => t == this.region)))
            }
            else {
                console.log('Entra')
                this.filTendersList = this.tendersList.filter(i => (i["regions"].some(t => t == this.region)))
            }
        }
        if (this.byDate) {
            if (this.byBudget || this.byInstitution || this.byProcess || this.byRegion) {
                this.filTendersList = this.filTendersList.filter(i => (i["publication_date"] >= this.minDate && i["publication_date"] <= this.maxDate))
            }
            else {
                this.filTendersList = this.tendersList.filter(i => (i["publication_date"] >= this.minDate && i["publication_date"] <= this.maxDate))
            }
        }

        console.log('Filtros \n', 'Fecha de publicación: ', this.minDate, '-', this.maxDate, '\n',
            'Presupuesto: ', this.minBudget, '-', this.maxBudget, '\n',
            'Tipo de procedimiento: ', this.process, '\n',
            'Instituciones: ', this.institution, '\n',
            'Regiones: ', this.regions, '\n',

        )
        console.log('Filtros activos: \n', 'Fecha de publicación: ', this.byDate, '\n',
            'Presupuesto ', this.byBudget, '\n',
            'Tipo de procedimiento: ', this.byProcess, '\n',
            'Institución: ', this.byInstitution, '\n',
            'Regiones: ', this.byRegion, '\n',
            'Licitaciones filtradas: \n',
        )
        console.log(this.filTendersList);   
    }

    loadTenders() {
        this.tendersList = JSON.parse(localStorage.getItem('tenderList'));
        this.filTendersList = this.tendersList;
        this.loadFavTenders();
    }

    isFavorite(tender: any) {
        if (this.favTendersList.filter(i => (i.tender_id === tender.tender_id)).length) {
            return true;
        } else {
            return false;
        }
    }



    saveFavTender() {
        Swal.fire({
            title: 'Guardar como favoritas',
            text: "¿Desea guardar estas licitaciones como favoritas?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, guardar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                let inputList = document.getElementsByTagName("input");
                for (let i = 0; i < inputList.length; i++) {
                    if (inputList[i].checked && !inputList[i].disabled) {
                        let tenderID = inputList[i].id;
                        console.log((this.userID).toString());
                        this._tenderService.createFavorite((this.userID).toString(), tenderID).subscribe(
                            (data: any) => {
                                console.log(data.data.row);
                            }
                        )
                    }
                }
                Swal.fire(
                    'Guardadas!',
                    'Las licitaciones han sido agregadas a su lista de favoritas.',
                    'success'
                )
                location.reload();
            }
        })

    }

}
