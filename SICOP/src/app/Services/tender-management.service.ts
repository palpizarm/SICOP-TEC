import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenderManagementService {

  url:string = 'http://localhost:3000/tenders';

  constructor(private http : HttpClient) { }

  getAll = () => {
    return this.http.get(
      `${this.url}/getAll`,
     
    )
  }
  
  getFavorites = (user_id: number) => {
    return this.http.get(
      `${this.url}/getFavorites/${user_id}`
    )
  }
  
  createFavorite = (user_id:string, tender_id:string) => {
    return this.http.post(
      `${this.url}/createFavorite`,
      {
        "user_id":user_id,
        "tender_id":tender_id
      }
    )
  }

  deleteFavorite = (user_id: number, tender_id: number) => {
    return this.http.delete(
      `${this.url}/deleteFavorite/${user_id}/${tender_id}`,

    )
  }

  insertHistory = (tender_id: number, user_id: number) => {
    return this.http.post(
      `${this.url}/insertHistory`,
      {
        "tender_id": tender_id,
        "user_id": user_id
      }
    )
  }

  getHistory = (user_id: number) => {
    return this.http.get(
      `${this.url}/getHistory/${user_id}`
    )
  }

  deleteHistory = (tender_ids: string[]) => {
    return this.http.patch(
      `${this.url}/deleteHistory`,
      {
        "tender_ids": tender_ids
      }
    )
  }
  
}
