import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {

  url:string = 'http://localhost:3000/gestionCuenta';
  
  constructor(private http : HttpClient) { }

  inactivateUser = (user_id:number) => {
    return this.http.patch(
      `${this.url}/registerClient`,
      {
        "user_id": user_id
      }
    )
  }

  getUsers = () => {
    return this.http.get(
      `${this.url}/getUsers`,
     
    )
  }
  
  getMaintenanceUsers = () => {
    return this.http.get(
      `${this.url}/getMaintenanceUsers`,
     
    )
  }

  getClientUsers = () => {
    return this.http.get(
      `${this.url}/getClientUsers`,
     
    )
  }
  
  login = (email:string, password:string) => {
    return this.http.post(
      `${this.url}/login`,
      {
        "email":email,
        "password":password
      }
    )
  }
  
}
