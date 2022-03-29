import { Component, OnInit } from '@angular/core';
import { AccountManagementService } from '../../Services/account-management.service';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {

  page:number=1;
  userList:any[]=[];
  maintanceUserList:any[]=[];
  clientUserList:any[]=[];
  clientUsers:boolean=false;
  maintanceUsers:boolean=false;
  constructor(private _accountService:AccountManagementService) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(){
    this._accountService.getUsers().subscribe(
      (data:any)=>{
        this.userList= data.data.rows;
        console.log(this.userList);
      }
    )
  }
  loadClientUsers(){
    this.maintanceUsers=false;
    this._accountService.getClientUsers().subscribe(
      (data:any)=>{
        this.clientUserList= data.data.rows;
        console.log(this.clientUserList,this.clientUsers);
      
      }
    )
  }

  loadMaintanceUsers(){
    this.clientUsers = false;
    this._accountService.getMaintenanceUsers().subscribe(
      (data:any)=>{
        this.maintanceUserList= data.data.rows;
        console.log(this.maintanceUserList,this.maintanceUsers);
      }
    )
  }

  inactiveUser(){

  }


}
