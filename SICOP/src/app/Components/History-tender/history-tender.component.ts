import { Component, OnInit } from '@angular/core';
import { TenderManagementService } from 'src/app/Services/tender-management.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-history-tender',
  templateUrl: './history-tender.component.html',
  styleUrls: ['./history-tender.component.css']
})
export class HistoryTenderComponent implements OnInit {

  page:number = 1;

  userID:number = 0;

  tenderListHistory:any = [];

  constructor(private tenderService: TenderManagementService) { 
    this.fetchHistory()
  }

  ngOnInit(): void {
  }

  fetchHistory(){
    this.tenderService.getHistory(Number(localStorage.getItem('userID')))
      .subscribe((data:any) => {
        if (data.code > 0) {
          this.tenderListHistory =  data.data.rows
          console.log()
        } else {
          console.error('Error in db connection!')
        }
      })
  }


  deleteTenderHistory() {
    let inputList = document.getElementsByTagName("input");
    let itemToDeleted: string[] = []
    for(let i=0;i<inputList.length;i++)
    {
      if(inputList[i].checked)
      {
        let item = inputList[i].id;
        itemToDeleted.push(item);
      }
    }
    if (itemToDeleted.length == 0) {
      Swal.fire(
        'Mensaje',
        'Por favor seleccione primero los elementos que sea eliminar',
        'warning'
      )
      return;
    }
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
        this.tenderService.deleteHistory(itemToDeleted)
          .subscribe((data:any) => {
            if(data.code > 0) {
              Swal.fire(
                'Eliminadas!',
                'Las instituciones han sido eliminadas de su lista de favoritas.',
                'success'
              )
              this.fetchHistory();
            } else {
              console.error(data.msg)
            }
          })
      }
    }) 
  }

}
