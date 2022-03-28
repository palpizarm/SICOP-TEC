import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { UserRegistrationService } from 'src/app/Services/user-registration.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {


  user: User = new User("","","");

  constructor(private userService : UserRegistrationService, private router : Router) { }

  ngOnInit(): void {

  }


  createAccount(form:NgForm) {
    if (form.errors) return;

    this.userService.registerClient(this.user.name, this.user.email, this.user.password)
      .subscribe((data:any) => {
        console.log(data);
        // do a observable to notify account created

        this.router.navigateByUrl('/')
      })
  }

}
