import { Component, OnInit } from '@angular/core';
import { TenderManagementService } from 'src/app/Services/tender-management.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-show-fav-tenders',
  templateUrl: './show-fav-tenders.component.html',
  styleUrls: ['./show-fav-tenders.component.css']
})
export class ShowFavTendersComponent implements OnInit {

    page:number = 1;

    userID:number = 0;
  
    favTendersList:any = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
  
    cargado:boolean = false;

    selectedItem:any = {}
  
    constructor(
        private _tenderService : TenderManagementService
    ) { }

    ngOnInit(): void {
        this.userID = parseInt(localStorage.getItem('userID'));
        this.loadFavTenders();
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

    deleteFavTenders(){

        Swal.fire({
          title: '¿Esta seguro?',
          text: "Una vez eliminadas no podrá revetirlo!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminalas!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            let inputList = document.getElementsByTagName("input");
            for(let i=0;i<inputList.length;i++)
            {
              if(inputList[i].checked)
              {
                let tenderID = parseInt(inputList[i].id);
                this._tenderService.deleteFavorite(this.userID,tenderID).subscribe(
                  (data:any) => {
                    console.log(data.data.row);
                  }
                )
              }
            }
            Swal.fire(
              'Eliminadas!',
              'Las instituciones han sido eliminadas de su lista de favoritas.',
              'success'
            )
            location.reload();
          }
        })
        
      }

}
