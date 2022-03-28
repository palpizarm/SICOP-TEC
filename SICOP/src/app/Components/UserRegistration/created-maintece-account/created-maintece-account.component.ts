import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-created-maintece-account',
  templateUrl: './created-maintece-account.component.html',
  styleUrls: ['./created-maintece-account.component.css']
})
export class CreatedMainteceAccountComponent implements OnInit {


  user: User = new User("", "", "");

  constructor() { }

  ngOnInit(): void {
  }


  createAccount(form:NgForm) {

  }

}
