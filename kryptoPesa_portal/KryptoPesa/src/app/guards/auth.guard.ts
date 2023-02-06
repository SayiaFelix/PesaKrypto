import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth:AuthService,
    private router:Router,  private toast: NgToastService,
    ){}

  canActivate():boolean {
    if (this.auth.isLoggedIn()){
      return true;
    }
    else{
      this.toast.error
      ({ detail: 'Failed Message', summary: "Please Login", duration: 5000 })
      this.router.navigate(['login']);
      return false;
     
    }
  }
}
