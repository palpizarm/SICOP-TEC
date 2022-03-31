import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreferencesManagementService {

  url:string = 'http://localhost:3000/category';
  
  constructor(private http : HttpClient) { }

  createCategory = (name:string, user_id:number, words:string[]) => {
    console.log(name,user_id,words)
    return this.http.post(
      `${this.url}/createCategory`,
      {
        "name":name,
        "user_id":user_id,
        "words":words
      }
    )
  }

  getCategories = (user_id:number) => {
    return this.http.get(
      `${this.url}/getCategories/${user_id}`
    )
  }

  getWords = (category_id:number) => {
    return this.http.get(
      `${this.url}/getWords/${category_id}`
    )
  }

  updateCategory = (category_id:number, name:string, user_id:number, addWords:string[], deleteWords:string[]) => {
    return this.http.patch(
      `${this.url}/updateCategory`,
      {
        "category_id":category_id,
        "name":name,
        "user_id":user_id,
        "addWords":addWords,
        "deleteWords":deleteWords
      }
    )
  }


  getCategoryById = (category_id:number) => {
    return this.http.get(
      `${this.url}/getCategory/${category_id}`
    )
  }


  deleteCategory = (category_id:number) => {
    return this.http.delete(
      `${this.url}/${category_id}`
    )
  }


}
