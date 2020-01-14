import { Product } from 'shared/models/product';
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
    return this.db.list('/products').snapshotChanges().pipe(map(changes=>
      changes.map(c=>({key:c.key, title:c.payload.val()["title"], price:c.payload.val()["price"],
                      category:c.payload.val()["category"], imageUrl:c.payload.val()["imageUrl"]}))));
  }

  get(productId){
    return this.db.object('/products/'+productId).valueChanges();
  }

  update(productId, product){
    return this.db.object('/products/'+productId).update(product); //product objekat ne sme da sadrzi id jer je on nepromenljiv
  }

  delete(productId){
    return this.db.object('/products/'+productId).remove();
  }
}
