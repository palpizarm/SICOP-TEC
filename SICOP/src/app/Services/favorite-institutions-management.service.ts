import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteInstitutionsManagementService {

  url: string = 'http://localhost:3000/institutions';

  constructor(private http: HttpClient) { }


  getFavorites = (user_id: number) => {
    return this.http.get(
      `${this.url}/getFavorites/${user_id}`
    )
  }

  createFavorite = (user_id: number, institution_id: number) => {
    return this.http.post(
      `${this.url}/createFavorite`,
      {
        "user_id": user_id,
        "institution_id": institution_id
      }
    )
  }

  deleteFavorite = (user_id: number, institution_id: number) => {
    return this.http.delete(
      `${this.url}/deleteFavorite/${user_id}/${institution_id}`,

    )
  }

  editInstitution = (institution_id: number, legal_id: number, abbreviation: string, name: string) => {
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



  getInstitutions = (institutionsList: any[]) => {
    return this.http.get(
      `${this.url}`,
    ).pipe(map(resp => {
      var institutions: [] = resp['data']
      institutions = institutions['rows']
      return institutions.filter((element: any) => compareInstitution(element.name, institutionsList))
    }))

  }
}


const compareInstitution = (name: string, institutionList: any) => {
  var result: boolean = true
  for (let i = 0; i < institutionList.length; i++) {
    if (institutionList[i].name == name) result = false
  }
  return result
}
