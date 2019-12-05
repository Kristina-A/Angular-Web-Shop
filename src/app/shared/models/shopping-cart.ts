import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';
export class ShoppingCart{
    items:ShoppingCartItem[]=[];
    
    constructor(private itemsMap:{[productId:string]:ShoppingCartItem}){
        for(let prodId in itemsMap){
            let item=itemsMap[prodId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    getQuantity(product:Product){
        if(!this.itemsMap) return 0;

        let item=this.itemsMap[product.key];
        return item? item.quantity : 0;
    }

    get totalPrice(){
        let sum=0;
        for(let prodId in this.items)
            sum+=this.items[prodId].totalPrice;
        
        return sum;
    }

    get totalItemsCount(){
        let shoppingCartItemCount=0;
        for(let productId in this.itemsMap){
          shoppingCartItemCount+= this.itemsMap[productId].quantity;
        }

        return shoppingCartItemCount;
    }
}