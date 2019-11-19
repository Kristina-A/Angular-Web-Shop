import { Product } from './models/product';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list<Product>('/products').valueChanges();
  }

  get(productId){
    return this.db.object('/products/'+productId).valueChanges();
  }

  update(productId, product){
    return this.db.object('/products/'+productId).update(product); //product objekat ne sme da sadrzi id jer je on nepromenljiv
  }

  delete(productId){
    return this.db.object('/product/'+productId).remove();
  }
}
