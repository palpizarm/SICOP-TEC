import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExternalServiceService {
  url:string = 'http://127.0.0.1:5000';

  constructor(private http:HttpClient) { }


  updateTender(){
    return this.http.get(
      `${this.url}/updateTender`
    )
  }

  searchTender(words:string[]) {
    return this.http.get(
      `${this.url}/getData/${words.length == 0? '[]':words}`
    )
  }

  getAllTender() {
    return this.http.get(
      `${this.url}/getAllTenders`
    )
  }
}
