import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FavoriteInstitutionsManagementService {

  url:string = 'http://localhost:3000/institutions/';
  
  constructor(private http : HttpClient) { }


  getFavorites = (user_id:number) => {
    return this.http.get(
      `${this.url}/getFavorites/${user_id}`
    )
  }
  
  createFavorite = (user_id:number, institution_id:number) => {
    return this.http.post(
      `${this.url}/createFavorite`,
      {
        "user_id":user_id,
        "institution_id":institution_id
      }
    )
  }

  deleteFavorite = (user_id:number, institution_id:number) => {
    return this.http.delete(
      `${this.url}/deleteFavorite/${user_id}/${institution_id}`,
     
    )
  }

  editInstitution = (institution_id:number,legal_id:number,abbreviation:string,name:string) => {
    return this.http.patch(
      `${this.url}/edit`,
      {
        "institution_id": institution_id,
        "legal_id": legal_id,
        "abbreviation": abbreviation,
        "name": name
      }
    )
  }





}
