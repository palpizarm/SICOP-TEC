import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AccountManagementService } from 'src/app/Services/account-management.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  user: User = new User();

  constructor(
    private accountService : AccountManagementService, 
    private router : Router
  ) { }

  ngOnInit(): void {
  }


  login(form:NgForm) {
    if (form.errors) return;
    this.accountService.login(this.user.email, this.user.password).subscribe(
      (data:any) => {
        if(data.code>0)
        {
          let userInfo = data.data.rows[0];
          localStorage.setItem('userID', userInfo.user_id);
          localStorage.setItem('roleID', userInfo.role_id);

          this.router.navigateByUrl('/FavInstitutions')
          // notify all component that users is logged
          this.accountService.isLoggedEmit(true)
        }
        else{
          Swal.fire(
            'Oops',
            data.msg,
            'error'
          )
        }         
    });

  }

}
