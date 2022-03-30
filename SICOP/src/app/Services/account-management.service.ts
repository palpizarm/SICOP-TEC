import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {

  url:string = 'http://localhost:3000/gestionCuenta';

  private isLogged = new Subject<Boolean>();
  public isLoggedEmitter = this.isLogged.asObservable();
  public static isUserLogged: boolean = false;

  isLoggedEmit(isLogged: boolean) {
    AccountManagementService.isUserLogged = isLogged
    this.isLogged.next(isLogged)
  }
  
  constructor(private http : HttpClient) { }

  inactivateUser = (user_id:number) => {
    return this.http.patch(
      `${this.url}/inactivateUser`,
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
