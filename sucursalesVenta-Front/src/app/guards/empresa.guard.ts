import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserRestService } from '../services/userRest/user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaGuard implements CanActivate {
  constructor(
    private userRest: UserRestService,
    public router: Router
  ){}
  canActivate()
    {
      if(this.userRest.getIdentity().role == 'ADMIN' || this.userRest.getIdentity().role == 'EMPRESA'){
        return true;
      }else{
        this.router.navigateByUrl('/home');
        return false;
      }
  }

  
  
}
