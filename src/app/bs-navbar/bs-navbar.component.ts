import { ShoppingCart } from './../models/shopping-cart';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser:AppUser;
  cart$:Observable<ShoppingCart>;

  constructor(private auth:AuthService, private cartService:ShoppingCartService) { 
  }

  logout(){
    this.auth.logout();
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser=>this.appUser=appUser); //ovde se subscribuje da bi se objekat preneo templateu, inace infinite loop zbog switchmap
    this.cart$=await this.cartService.getCart();
  }
}
