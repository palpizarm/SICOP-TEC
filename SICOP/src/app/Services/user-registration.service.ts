import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  url:string = 'http://localhost:3000/registroUsuario/';
  
  constructor(private http : HttpClient) { }

  registerClient = (name:string, email:string, password:string) => {
    return this.http.post(
      `${this.url}/registerClient`,
      {
        "name":name,
        "email":email,
        "password":password
      }
    )
  }
}
