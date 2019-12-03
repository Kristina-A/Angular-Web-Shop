import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase, private cartservice:ShoppingCartService) { }

  async placeOrder(order){
    let result= await this.db.list('/orders').push(order);
    this.cartservice.clearCart();
    return result;
  }

  getOrders(){
    return this.db.list('/orders').valueChanges();//za admin manage orders
  }

  getOrdersByUser(userId:string){
    return this.db.list('/orders',ref=>ref.orderByChild('userId').equalTo(userId)).valueChanges();//za my orders
  }
}
