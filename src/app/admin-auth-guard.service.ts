import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth:AuthService, private userService: UserService) { }

  canActivate():Observable<boolean>{
    return this.auth.appUser$.pipe(
        map(u=>u.isAdmin)
      )
  }
}
