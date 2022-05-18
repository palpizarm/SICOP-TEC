import { Component, OnInit } from '@angular/core';
import { TenderManagementService } from 'src/app/Services/tender-management.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-show-tenders',
  templateUrl: './show-tenders.component.html',
  styleUrls: ['./show-tenders.component.css']
})
export class ShowTendersComponent implements OnInit {

    page:number = 1;

    userID:number = 0;
  
    tendersList:any = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
  
    favTendersList:any = []

    cargado:boolean = false;
  
    constructor(
        private _tenderService : TenderManagementService
    ) { }

    ngOnInit(): void {
        this.userID = parseInt(localStorage.getItem('userID'));
        this.loadTenders();

        const showNavbar = (toggleId, navId, bodyId, headerId) =>{
        const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        bodypd = document.getElementById(bodyId),
        headerpd = document.getElementById(headerId)
        
        // Validate that all variables exist
        if(toggle && nav && bodypd && headerpd){
        toggle.addEventListener('click', ()=>{
        // show navbar
        nav.classList.toggle('show')
        // change icon
        toggle.classList.toggle('bx-x')
        // add padding to body
        bodypd.classList.toggle('body-pd')
        // add padding to header
        headerpd.classList.toggle('body-pd')
        })
        }
        }
        
        showNavbar('header-toggle','nav-bar','body-pd','header')
        
        /*===== LINK ACTIVE =====*/
        const linkColor = document.querySelectorAll('.nav_link')
        
        function colorLink(){
        if(linkColor){
        linkColor.forEach(l=> l.classList.remove('active'))
        this.classList.add('active')
        }
        }
        linkColor.forEach(l=> l.addEventListener('click', colorLink))
            
             // Your code to run since DOM is loaded and ready
          
    }

    loadFavTenders()
    {
        this._tenderService.getFavorites(this.userID).subscribe(
            (data:any) => {
                this.favTendersList = data.data.rows;
                console.log(this.favTendersList);
                this.cargado = true;
            }
        )
    }

    loadTenders()
    {
        this._tenderService.getAll().subscribe(
            (data:any) => {
                this.tendersList = data.data.rows;
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
