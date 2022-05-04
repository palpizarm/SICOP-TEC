import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  url:string = 'http://localhost:3000/notificationsCenter';

  constructor(private http: HttpClient) { }


  getNotification(user_id:number) {
    return this.http.get(
      `${this.url}/getNotifications/${user_id}`
    )
  }
}
