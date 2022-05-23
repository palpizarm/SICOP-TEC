import { Component, OnInit } from '@angular/core';
import { ExternalServiceService } from 'src/app/Services/external-service.service';
import { TenderManagementService } from 'src/app/Services/tender-management.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-tender-list',
  templateUrl: './tender-list.component.html',
  styleUrls: ['./tender-list.component.css']
})
export class TenderListComponent implements OnInit {

  page:number = 1;

  userID:number = 0;

  tenderList:any[] = [];

  selectedItem:any = {}

  constructor(private tenderService: TenderManagementService, private externalService: ExternalServiceService) { 
    
  }

  ngOnInit(): void {
    this.fetchTenders()
  }

  fetchTenders(){
    this.externalService.getAllTender()
      .subscribe((data:any) => {
        if (data.code > 0) {
          this.tenderList =  JSON.parse(data.data)
          console.log(this.tenderList)
        } else {
          console.error('Error in db connection!')
        }
      })
  }

  update() {
    this.externalService.updateTender()
      .subscribe((data:any) => {
        if (data.code > 0) {
          Swal.fire(
            '',
            'Licitaciones actualizadas con éxito!',
            'success'
          )
          this.tenderList = data.data.rows
        } else {
          console.error("Error in db connection")
        }
      })
  }

}
