import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping={};
  cart:ShoppingCart;
  userId:string;
  cartSubscription:Subscription;
  userSubscription:Subscription;

  constructor(private router:Router,
     private cartService:ShoppingCartService,
     private orderService:OrderService,
     private authService:AuthService){}

  async ngOnInit(){
    let cart$=await this.cartService.getCart();
    this.cartSubscription= cart$.subscribe(cart=>this.cart=cart);
    this.userSubscription= this.authService.user$.subscribe(user=>this.userId=user.uid);
  }

  ngOnDestroy(){
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder(){
    let order=new Order(this.userId, this.shipping, this.cart);
    let result= await this.orderService.placeOrder(order);//vraca generisan objekat
    this.router.navigate(['/order-success',result.key]);
  }
}
