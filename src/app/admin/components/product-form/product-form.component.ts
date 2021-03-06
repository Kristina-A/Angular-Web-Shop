import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product={};
  id;

  constructor(private categoryService:CategoryService, 
    private productService:ProductService, 
    private router:Router,
    private route:ActivatedRoute) { 
    this.categories$=categoryService.getAll();

    this.id=this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p=>this.product=p); //take uzima jedan i zavrsava subscription, ne treba unsubscribe
  }

  save(product){
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm('Da li ste sigurni da želite da obrišete ovaj proizvod?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
