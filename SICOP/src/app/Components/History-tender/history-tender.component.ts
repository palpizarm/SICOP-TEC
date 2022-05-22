import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-history-tender',
  templateUrl: './history-tender.component.html',
  styleUrls: ['./history-tender.component.css']
})
export class HistoryTenderComponent implements OnInit {

  page:number = 1;

  userID:number = 0;

  tenderListHisotry:any = [];

  constructor() { }

  ngOnInit(): void {
  }


  deleteTenderHistory() {
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
            let institutionID = parseInt(inputList[i].id);
            // this._favInstitutionsService.deleteFavorite(this.userID,institutionID).subscribe(
              (data:any) => {
                // this.institutionsList = data.data.row;
              }
            // )
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
