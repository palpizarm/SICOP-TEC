import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { UserRegistrationService } from 'src/app/Services/user-registration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-created-maintece-account',
  templateUrl: './created-maintece-account.component.html',
  styleUrls: ['./created-maintece-account.component.css']
})
export class CreatedMainteceAccountComponent implements OnInit {


  user: User = new User();

  constructor(private userService : UserRegistrationService, private router : Router) { }

  ngOnInit(): void {
  }


  createAccount(form:NgForm) {
    if (form.form.status == 'INVALID' ) return;

    this.userService.registerMaintenance(this.user.name, this.user.email, this.user.password)
      .subscribe((data:any) => {
        if (data.code > 0) {
          Swal.fire({
            text: 'Usuario creado con exito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          form.resetForm()
          
        } else {
          Swal.fire({
            text: data.msg,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      })
  }

}
