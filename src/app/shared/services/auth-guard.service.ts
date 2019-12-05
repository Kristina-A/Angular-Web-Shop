import { Injectable } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService, private router:Router) { }

  canActivate(route, state:RouterStateSnapshot){
    return this.auth.user$.pipe(map(user=>{  //mapira se observable na boolean, angular se interno subscribuje i unsubscribuje
      if(user) return true;

      this.router.navigate(['/login'], {queryParams: {returnUrl:state.url}}); //osnovna ruta +  opcioni parametri
      return false;
    }))
  }
}
