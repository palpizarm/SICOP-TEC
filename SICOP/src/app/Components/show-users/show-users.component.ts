import { Component, OnInit } from '@angular/core';
import { AccountManagementService } from '../../Services/account-management.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

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
      }
    )
  }
  loadClientUsers(){
    this.maintanceUsers=false;
    this._accountService.getClientUsers().subscribe(
      (data:any)=>{
        this.clientUserList= data.data.rows;
      
      }
    )
  }

  loadMaintanceUsers(){
    this.clientUsers = false;
    this._accountService.getMaintenanceUsers().subscribe(
      (data:any)=>{
        this.maintanceUserList= data.data.rows;
      }
    )
  }

  inactiveUser(user_id:number){
    Swal.fire({
      text: '¿Esta seguro de desea inactivar el usuario?',
      icon: 'question',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then(result => {
      if(result.isConfirmed) {
        this._accountService.inactivateUser(user_id)
        .subscribe((data:any) => {
          if (data.code > 0) {
            Swal.fire({text:'Usuario inactivado',icon:'success'})
            if (this.maintanceUsers) {
              this.loadMaintanceUsers()
            } else if (this.clientUsers) {
              this.loadClientUsers()
            } else {
              this.loadUsers()
            }
          } else {
            Swal.fire({text:data.msg, icon:'error'})
          }
        })
      }
    })
  }

  downloadUsers()
  {
    var wb = XLSX.utils.book_new();
    wb.SheetNames.push("Usuarios");
    var ws_data = [['Nombre','Correo Electronico','Tipo de Usuario']];

    if(this.clientUsers)
    {
      for(let i=0;i<this.clientUserList.length;i++)
      {
        let user = this.clientUserList[i];
        ws_data.push([user.name,user.email,user.role])
      }
      var ws = XLSX.utils.aoa_to_sheet(ws_data);
      wb.Sheets["Usuarios"] = ws;

      XLSX.writeFile(wb,"Lista_Usuarios_Clientes.xlsx");

    }else if(this.maintanceUsers)
    {
      for(let i=0;i<this.maintanceUserList.length;i++)
      {
        let user = this.maintanceUserList[i];
        ws_data.push([user.name,user.email,user.role])
      }
      var ws = XLSX.utils.aoa_to_sheet(ws_data);
      wb.Sheets["Usuarios"] = ws;

      XLSX.writeFile(wb,"Lista_Usuarios_Mantenimiento.xlsx");

    }
    else{
      for(let i=0;i<this.userList.length;i++)
      {
        let user = this.userList[i];
        ws_data.push([user.name,user.email,user.role])
      }
      var ws = XLSX.utils.aoa_to_sheet(ws_data);
      wb.Sheets["Usuarios"] = ws;

      XLSX.writeFile(wb,"Lista_Usuarios.xlsx");
    }
  }


  status(status:number) {
    return status==1?'Activo':'Inactivo';
  }


}
