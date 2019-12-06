import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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
    return this.db.list('/orders').snapshotChanges().pipe(map(changes=>
    changes.map(c=>({key:c.key, value:c.payload.val()}))));//za admin manage orders
  }

  getOrdersByUser(userId:string){
    return this.db.list('/orders',ref=>ref.orderByChild('userId').equalTo(userId)).snapshotChanges()
    .pipe(map(changes=>changes.map(c=>({key:c.key, value:c.payload.val()}))));//za my orders
  }

  get(orderId){
    return this.db.object('/orders/'+orderId).valueChanges();
  }
}
