import { Component, OnInit, ElementRef } from '@angular/core';
import { range } from 'rxjs';
import { TenderManagementService } from 'src/app/Services/tender-management.service';
import Swal from 'sweetalert2'
import { element } from 'protractor';
import { ThisReceiver } from '@angular/compiler';

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
    cargado:boolean = false;

    //Doing
    byBudget:boolean = true;
    minBudget:number = 0;
    maxBudget:number = 300000000;
    
    //Doing
    byProcess:boolean = true;
    process:string= 'LICITACIÓN ABREVIADA';
    procedures_type= ['LICITACIÓN ABREVIADA']
    //Doing
    byRegion:boolean = false;
    regions:any =['Alajuela'];

    //Doing
    byDate:boolean = true;
    minDate:string ='2022-05-12T00:00:00.000Z';
    maxDate:string='2022-06-15T00:00:00.000Z';

    //Doing
    byInstitution: boolean = false;
    institutions:any=[];

  
    constructor(
        private _tenderService : TenderManagementService
    ) { }

    ngOnInit(): void {
        this.userID = parseInt(localStorage.getItem('userID'));
        this.loadTenders();
        this.loadFilTenders();
        console.log(this.budgetValue('29.742.400 [CRC]'))
        
        
        // const showNavbar = (toggleId, navId, bodyId, headerId) =>{
        //   const toggle = document.getElementById(toggleId),
        //   nav = document.getElementById(navId),
        //   bodypd = document.getElementById(bodyId),
        //   headerpd = document.getElementById(headerId)
  
        //   // Validate that all variables exist
        //   if(toggle && nav && bodypd && headerpd){
        //   toggle.addEventListener('click', ()=>{
        //   // show navbar
        //   nav.classList.toggle('show')
        //   // change icon
        //   toggle.classList.toggle('bx-x')
        //   // add padding to body
        //   bodypd.classList.toggle('body-pd')
        //   // add padding to header
        //   headerpd.classList.toggle('body-pd')
        //   })
        //   }
        //   }
  
        //   showNavbar('header-toggle','nav-bar','body-pd','header')
  
        //   /*===== LINK ACTIVE =====*/
        //   const linkColor = document.querySelectorAll('.nav_link')
  
        //   function colorLink(){
        //   if(linkColor){
        //   linkColor.forEach(l=> l.classList.remove('active'))
        //   this.classList.add('active')
        //   }
        //   }
        //   linkColor.forEach(l=> l.addEventListener('click', colorLink))
  
        //        // Your code to run since DOM is loaded and ready
  
      
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
    budgetValue = (value:string)=>{
      let amount = value.split('[')[0];
      return parseInt(amount.replace(/\./g,''));
    }

    loadFilTenders(){
      if(this.byBudget){
        this.filTendersList = this.tendersList.filter(i => (this.budgetValue(i["budget"]) >= this.minBudget && this.budgetValue(i["budget"]) <= this.maxBudget));      
      }
      if(this.byInstitution){
        if(this.byBudget){
          this.filTendersList = this.filTendersList.filter(i => this.institutions.includes(i["institution_name"] ))     
        }
        else{
          this.filTendersList = this.tendersList.filter(i => this.institutions.includes(i["institution_name"] )) 
 
        }
      }
      if(this.byProcess){
        if(this.byBudget || this.byInstitution){
          
          this.filTendersList = this.filTendersList.filter(i => (i["procedure_type"] === this.process))          
        }
        else{
          this.filTendersList = this.tendersList.filter(i => (i["procedure_type"] === this.process))          
        }
      }
      if(this.byRegion){
        if(this.byBudget || this.byInstitution || this.byProcess){
          this.filTendersList = this.filTendersList.filter(i => (i["regions"].some(t => this.regions.includes(t)))) 
        }
        else{
          console.log('Entra')
          this.filTendersList = this.tendersList.filter(i => (i["regions"].some(t => this.regions.includes(t)))) 
        }
      }
      if(this.byDate){      
        if(this.byBudget || this.byInstitution || this.byProcess || this.byRegion){
          this.filTendersList = this.filTendersList.filter(i => (i["publication_date"] >= this.minDate && i["publication_date"] <= this.maxDate))           
        }
        else{
          this.filTendersList = this.tendersList.filter(i => (i["publication_date"] >= this.minDate && i["publication_date"] <= this.maxDate))  
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
        this.tendersList = JSON.parse(localStorage.getItem('tenderList'));
        this.loadFavTenders();
        console.log(this.tendersList)
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
