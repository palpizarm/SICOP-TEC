import { Component, OnInit, ElementRef } from '@angular/core';
import { range } from 'rxjs';
import { TenderManagementService } from 'src/app/Services/tender-management.service';
import Swal from 'sweetalert2'
import { element } from 'protractor';

@Component({
  selector: 'app-show-tenders',
  templateUrl: './show-tenders.component.html',
  styleUrls: ['./show-tenders.component.css']
})
export class ShowTendersComponent implements OnInit {

    page:number = 1;

    userID:number = 0;
  
    tendersList:any = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
  
    favTendersList:any = [];
    filTendersList: any = [];
    tenders: any = 
    [
      {
      'Número de procedimiento':1, 'Fecha/hora de publicación':'2022-04-30',
      'Nombre de la institución': 'MOPT', 'Descripción del procedimiento':'CONTRATACIÓN DIRECTA',
      'Fecha/hora de apertura de ofertas': '2022-06-30', 'Presupuesto total estimado': 956000,
      'Estado del concurso': 'En recepcion de ofertas', 'Regiones': ['San Jose','Heredia','Alajuela']
      },
      {
        'Número de procedimiento':2, 'Fecha/hora de publicación':'2022-05-10',
        'Nombre de la institución': 'MOPT', 'Descripción del procedimiento':'CONTRATACIÓN DIRECTA',
        'Fecha/hora de apertura de ofertas': '2022-07-30', 'Presupuesto total estimado': 10000000,
        'Estado del concurso': 'En recepcion de ofertas', 'Regiones': ['San Jose','Heredia']
        },
        {
          'Número de procedimiento':3, 'Fecha/hora de publicación':'2022-06-15',
          'Nombre de la institución': 'MOPT', 'Descripción del procedimiento':'CONTRATACIÓN INDIRECTA',
          'Fecha/hora de apertura de ofertas': '2022-07-30', 'Presupuesto total estimado': 467000,
          'Estado del concurso': 'En recepcion de ofertas', 'Regiones': ['San Jose','Heredia','Alajuela']
          },
          {
            'Número de procedimiento':4, 'Fecha/hora de publicación':'2022-06-18',
            'Nombre de la institución': 'MEP', 'Descripción del procedimiento':'CONTRATACIÓN DIRECTA',
            'Fecha/hora de apertura de ofertas': '2022-07-30', 'Presupuesto total estimado': 500000,
            'Estado del concurso': 'En recepcion de ofertas', 'Regiones': ['San Jose','Heredia']
            }
    ]

    cargado:boolean = false;

    //Doing
    byBudget:boolean = true;
    minBudget:number = 0;
    maxBudget:number = 10000000;
    
    //Doing
    byProcess:boolean = false;
    process:string= 'CONTRATACIÓN INDIRECTA';

    //Doing
    byRegion:boolean = false;
    regions:any =['Alajuela'];

    //Doing
    byDate:boolean = false;
    minDate:string ='2022-04-30';
    maxDate:string='2022-05-30';

    //Doing
    byInstitution: boolean = true;
    institutions:any=[];

  
    constructor(
        private _tenderService : TenderManagementService
    ) { }

    ngOnInit(): void {
        this.userID = parseInt(localStorage.getItem('userID'));
        this.loadTenders();
    }

    loadFavTenders()
    {
        this._tenderService.getFavorites(this.userID).subscribe(
            (data:any) => {
                this.favTendersList = data.data.rows;
                this.cargado = true;
            }
        )
    }

    loadFilTenders(){
      if(this.byBudget){
        this.filTendersList = this.tenders.filter(i => (i["Presupuesto total estimado"] >= this.minBudget && i["Presupuesto total estimado"] <= this.maxBudget));      
      }
      if(this.byInstitution){
        if(this.byBudget){
          this.filTendersList = this.filTendersList.filter(i => this.institutions.includes(i["Nombre de la institución"] )) 
        //  this.filTendersList = this.filTendersList.filter(i => (i["Nombre de la institución"] === this.institution));      
        }
        else{
          this.filTendersList = this.tenders.filter(i => this.institutions.includes(i["Nombre de la institución"] )) 
 
        }
      }
      if(this.byProcess){
        if(this.byBudget || this.byInstitution){
          
          this.filTendersList = this.filTendersList.filter(i => (i["Descripción del procedimiento"] === this.process))          
        }
        else{
          this.filTendersList = this.tenders.filter(i => (i["Descripción del procedimiento"] === this.process))          
        }
      }
      if(this.byRegion){
        if(this.byBudget || this.byInstitution || this.byProcess){
          this.filTendersList = this.filTendersList.filter(i => (i["Regiones"].some(t => this.regions.includes(t)))) 
        }
        else{
          this.filTendersList = this.tenders.filter(i => (i["Regiones"].some(t => this.regions.includes(t)))) 
        }
      }
      if(this.byDate){      
        if(this.byBudget || this.byInstitution || this.byProcess || this.byRegion){
          this.filTendersList = this.filTendersList.filter(i => (i["Fecha/hora de publicación"] >= this.minDate && i["Fecha/hora de publicación"] <= this.maxDate))           
        }
        else{
          this.filTendersList = this.tenders.filter(i => (i["Fecha/hora de publicación"] >= this.minDate && i["Fecha/hora de publicación"] <= this.maxDate))  
        }
      }

      console.log('Filtros \n','Fecha de publicación: ',this.minDate,'-',this.maxDate,'\n', 
                               'Presupuesto: ',this.minBudget,'-',this.maxBudget,'\n',
                               'Tipo de procedimiento: ',this.process,'\n',
                               'Instituciones: ',this.institutions,'\n',
                               'Regiones: ',this.regions,'\n',
                              
                  )
     console.log('Filtros activos: \n', 'Fecha de publicación: ',this.byDate,'\n',
                                      'Presupuesto ',this.byBudget,'\n',
                                      'Tipo de procedimiento: ',this.byProcess,'\n',
                                      'Institución: ',this.byInstitution,'\n',
                                      'Regiones: ',this.byRegion,'\n',
                                      'Licitaciones filtradas: \n',
                )
     console.log(this.filTendersList)

    }

   

    loadTenders()
    {
        this._tenderService.getAll().subscribe(
            (data:any) => {
                this.tendersList = data.data.rows;
                this.loadFilTenders();
                this.loadFavTenders();
            }
        )
    }
  
    isFavorite(tender:any)
    {
        if( this.favTendersList.filter(i => (i.tender_id === tender.tender_id)).length ) {
            return true;
        } else {
            return false;
        }
    }

    

    saveFavTender()
    {
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
              for(let i=0;i<inputList.length;i++)
              {
                if(inputList[i].checked && !inputList[i].disabled)
                {
                  let tenderID = inputList[i].id;
                  console.log((this.userID).toString());
                  this._tenderService.createFavorite((this.userID).toString(),tenderID).subscribe(
                    (data:any) => {
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
