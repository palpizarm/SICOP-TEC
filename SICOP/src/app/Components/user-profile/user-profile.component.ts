import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AccountManagementService } from 'src/app/Services/account-management.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User = new User()
  editDisabled: Boolean = true
  changePassDisabled: Boolean = true
  oldPassIncorrect = false
  adminAccount = false
  oldPassword = ''

  constructor(private accountService: AccountManagementService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.getAccountInfo()
      .subscribe((data: any) => {
        if (data.code > 0) {
          console.log(data)
          this.user = data.data.rows[0]
          this.user.password = ''
          this.user.password2 = ''
          this.adminAccount = localStorage.getItem('roleID') == '1' ? true : false
        }
      })
  }

  // form.value get all values of the form in a json object
  editInfo(form: NgForm, option: number) {
    let obj = form.value

    if (option == 2) {
      this.accountService.updatePassword(Number(localStorage.getItem('userID')), this.oldPassword, this.user.password)
        .subscribe((data: any) => {
          console.log(data)
          if (data.code > 0) {
            Swal.fire({
              title: 'Contraseña actualizada correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            })
            this.disabledInputs(2)
          } else if (data.code == -4) {
            this.oldPassIncorrect = true
          } else {
            Swal.fire({
              title: data.msg,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          }
        },
          (err: any) => {
            Swal.fire({
              title: err.error.msg,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          })
    }
    if (option == 1) {
      this.accountService.updateAccount(Number(localStorage.getItem('userID')), obj.userName, obj.email)
        .subscribe((data: any) => {
          if (data.code > 0) {
            Swal.fire({
              icon: 'success',
              title: 'Datos actualizados',
              showConfirmButton: true
            })
            this.disabledInputs(1)
          }
        },
          (err: any) => {
            Swal.fire({
              title: err.error.msg,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          })
    }
  }

  disabledInputs(option: number) {

    if (option == 2) {
      this.changePassDisabled = true
      this.user.password = ''
      this.user.password2 = ''
      this.oldPassword = ''
      this.oldPassIncorrect = false
    } else if (option == 1) {
      this.editDisabled = true
      this.ngOnInit()
    }
  }

  enableEdit() {
    this.editDisabled = false
  }

  enableChangePassword() {
    this.changePassDisabled = false
  }

  deleteAccount() {
    Swal.fire({
      title: 'Eliminar cuenta',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      text: 'Confirmar eliminación',
      showCancelButton: true
    })
      .then(data => {
        if (data.isConfirmed) {
          this.accountService.deleteUser(Number(localStorage.getItem('userID')))
            .subscribe((data: any) => {
              if (data.code > 0) {
                Swal.fire({
                  icon: 'success',
                  title: 'Cuenta eliminda con exito',
                  showConfirmButton: false,
                  timer: 1000
                }).then((result) => {
                    localStorage.removeItem('userID')
                    localStorage.removeItem('roleID')
                    this.accountService.isLoggedEmit(false);
                    this.router.navigateByUrl('')
                  this.router.navigateByUrl('/')
                })
              }
            })
        }
      })
  }

}
