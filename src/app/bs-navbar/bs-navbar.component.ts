import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser:AppUser;

  constructor(private auth:AuthService) { 
    auth.appUser$.subscribe(appUser=>this.appUser=appUser); //ovde se subscribuje da bi se objekat preneo templateu, inace infinite loop zbog switchmap
  }

  logout(){
    this.auth.logout();
  }

}
