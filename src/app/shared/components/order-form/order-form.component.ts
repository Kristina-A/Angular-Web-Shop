import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  order:{};
  total:number;
  id;

  constructor(private orderService:OrderService, private router:Router, private route:ActivatedRoute){
      this.id=this.route.snapshot.paramMap.get('id');
      if(this.id) this.orderService.get(this.id).pipe(take(1)).subscribe(o=>{
        this.order=o;
        this.total=0;
        this.order["items"].forEach(element => {
          this.total+=element["totalPrice"];
        });
      }); //take uzima jedan i zavrsava subscription, ne treba unsubscribe
  }
}
