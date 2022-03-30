import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountManagementService } from '../Services/account-management.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {



  constructor(private accountService : AccountManagementService) {}

  canActivate():boolean {
    if (localStorage.getItem('userID')) {
      this.accountService.isLoggedEmit(true);
      return true;
    } else {
      this.accountService.isLoggedEmit(false);
      return false
    }
  }
  
}
