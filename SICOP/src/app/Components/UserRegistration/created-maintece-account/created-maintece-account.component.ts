import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { UserRegistrationService } from 'src/app/Services/user-registration.service';

@Component({
  selector: 'app-created-maintece-account',
  templateUrl: './created-maintece-account.component.html',
  styleUrls: ['./created-maintece-account.component.css']
})
export class CreatedMainteceAccountComponent implements OnInit {


  user: User = new User("", "", "");

  constructor(private userService : UserRegistrationService, private router : Router) { }

  ngOnInit(): void {
  }


  createAccount(form:NgForm) {
    if (form.errors) return;

    this.userService.registerMaintenance(this.user.name, this.user.email, this.user.password)
      .subscribe((data:any) => {
        console.log(data);
        // do a observable to notify account created


        // go to user admin dashboard
        this.router.navigateByUrl('/')
      })
  }

}
