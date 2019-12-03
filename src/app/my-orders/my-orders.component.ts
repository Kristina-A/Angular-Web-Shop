import { OrderService } from './../order.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$;

  constructor(private authService:AuthService, private orderService:OrderService) {
    this.orders$=authService.user$.pipe(switchMap(u=>this.orderService.getOrdersByUser(u.uid)));
   }

}
