import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular7-data-table';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products:Product[];
  subscription:Subscription;
  tableResource:DataTableResource<Product>;
  items:Product[]=[];//jer se u nekom trenutku length trazi
  itemCount:number;

  constructor(private productService:ProductService) { 
    this.subscription= this.productService.getAll().pipe(map(changes=>
    changes.map(c=>({key:c.key, title:c.payload.val()["title"], price:c.payload.val()["price"],
                    category:c.payload.val()["category"], imageUrl:c.payload.val()["imageUrl"]}))))
    .subscribe(products=>{
      this.products=products;    
      this.initializeTable(products);
    });
  }

  private initializeTable(products:Product[]){
    this.tableResource=new DataTableResource(products);

    this.tableResource.query({offset:0}) //nema ofseta, za prvu stranu se uzima
    .then(items=>this.items=items); //uzimaju se za trenutnu stranu proizvodi
    this.tableResource.count() //vraca ukupan br recorda u tabeli
    .then(count=>this.itemCount=count); //inicijalizuje parametar za data-table
  }

  reloadItems(params){ //arg su parametri tabele, prilikom ucitavanja stranice poziva se ova fja, pre nego se inicijalizuje
    if(!this.tableResource) return;

    this.tableResource.query(params)
    .then(items=>this.items=items);
  }

  filter(query:string){
    let filteredProducts=(query)?
    this.products.filter(p=>p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;

    this.initializeTable(filteredProducts);
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
