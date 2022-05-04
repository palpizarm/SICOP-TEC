import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarOptions } from './Classes/sidebar-options.model';
import { Options } from './Models/options.model';
import { AccountManagementService } from './Services/account-management.service';
import { NotificationService } from './Services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SICOP';

  options: Options[] = []

  displaySidebar: boolean = true;
  isLogged: boolean = false;
  notificationsList:any[] = [];

  constructor(private accountService : AccountManagementService, private router: Router, private notificationService:NotificationService) {}

  ngOnInit(): void {
    this.accountService.isLoggedEmitter
      .subscribe((isLogged : boolean) => {
        this.isLogged = isLogged
        this.options = SidebarOptions.getOptions(localStorage.getItem('roleID'))
        if (!this.isLogged) {
          localStorage.removeItem('userID')
          localStorage.removeItem('roleID')
        }
      })
  }

  loadNotification() {
    if(this.isLogged) {
      this.notificationService.getNotification(parseInt(localStorage.getItem('userID')))
        .subscribe((data:any) => {
          if (data.code > 0) {
            this.notificationsList = data.data.rows
            console.log(this.notificationsList)
          }
        })
    }
  }

  logout() {
    localStorage.removeItem('userID')
    localStorage.removeItem('roleID')
    this.accountService.isLoggedEmit(false)
    this.router.navigateByUrl('')
  }
  
}
