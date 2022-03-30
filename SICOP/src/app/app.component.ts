import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarOptions } from './Classes/sidebar-options.model';
import { Options } from './Models/options.model';
import { AccountManagementService } from './Services/account-management.service';

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

  constructor(private accountService : AccountManagementService, private router: Router) {}

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

  logout() {
    localStorage.removeItem('userID')
    localStorage.removeItem('roleID')
    this.accountService.isLoggedEmit(false)
    this.router.navigateByUrl('')
  }
  
}
