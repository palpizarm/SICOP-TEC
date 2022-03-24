import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreferencesManagementService {

  url:string = 'http://localhost:3000/category/';
  
  constructor(private http : HttpClient) { }

  getCategories = (user_id:number) => {
    return this.http.get(
      `${this.url}/getCategories/${user_id}`
    )
  }

}
