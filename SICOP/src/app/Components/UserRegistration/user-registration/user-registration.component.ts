import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AccountManagementService } from 'src/app/Services/account-management.service';
import { UserRegistrationService } from 'src/app/Services/user-registration.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {


  user: User = new User("","","");

  constructor(private userService : UserRegistrationService, private router : Router, private accountService: AccountManagementService) { }

  ngOnInit(): void {

  }


  createAccount(form:NgForm) {
    if (form.errors) return;

    this.userService.registerClient(this.user.name, this.user.email, this.user.password)
      .subscribe((data:any) => {
        if (data.code > 0) {
          this.accountService.login(this.user.email, this.user.password)
            .subscribe((resp:any) => {
              if (resp.code > 0) {
                let user = data.data.rows[0]
                localStorage.setItem('userID', user.user_id)
                localStorage.setItem('roleID', user.role_id)
                this.accountService.isLoggedEmit(true)
                this.router.navigateByUrl('/')
              }
            })
        }
      })
  }

}
