import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AccountManagementService } from 'src/app/Services/account-management.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  user: User = new User("","","");

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
        console.log(data);
        // do a observable to notify account created

        // this.router.navigateByUrl('/')
    });

  }

}
