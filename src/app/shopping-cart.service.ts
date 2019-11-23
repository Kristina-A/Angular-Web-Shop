import { ShoppingCart } from './models/shopping-cart';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  create(){
    return this.db.list('shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  async getCart():Promise<Observable<ShoppingCart>>{
    let cartId=await this.getOrCreateCartId();
    return this.db.object<ShoppingCart>('/shopping-carts/'+cartId).valueChanges()
    .pipe(map(x=>new ShoppingCart(x.items)));
  }

  private getItem(cartId:string, itemId:string){
    return this.db.object('/shopping-carts/'+cartId+'/items/'+itemId);
  }

  private async getOrCreateCartId(){
    let cartId=localStorage.getItem('cartId');

    if(cartId) return cartId;

    let result= await this.create();
    localStorage.setItem('cartId', result.key); //u local storage kreirana korpa jer i nelogovani korisnici mogu da dodaju u korpu
    return result.key;
  }

  async addToCart(product:Product){
    let cartId= await this.getOrCreateCartId();//povratna vrednost async fje je uvek promise, da bi se vratila vrednost, mora await
    let item$=this.getItem(cartId, product.key);

    item$.valueChanges().pipe(take(1)).subscribe((item:any)=>{
      item$.update({product:product, quantity: item? item.quantity +1 : 1}); //koristi se item$ jer na observable ne postoji ova fja
    });
  }

  async removeFromCart(product:Product){
    let cartId= await this.getOrCreateCartId();//povratna vrednost async fje je uvek promise
    let item$=this.getItem(cartId, product.key);

    item$.valueChanges().pipe(take(1)).subscribe((item:any)=>{
      item$.update({product:product, quantity: item? item.quantity -1 : 0}); //koristi se item$ jer na observable ne postoji ova fja
    });
  }
}