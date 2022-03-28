import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  url:string = 'http://localhost:3000';
  constructor(private http : HttpClient) { }

  

  test = (parms:any) => {
    return this.http.get(
      `${this.url}/test`
    )
  }

}
