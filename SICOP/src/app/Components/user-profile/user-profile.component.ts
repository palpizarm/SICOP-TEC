import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user:User = new User()
  constructor() { }

  ngOnInit(): void {
  }

  editInfo(form) {

  }

}
