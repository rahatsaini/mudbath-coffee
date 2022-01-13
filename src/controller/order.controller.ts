import { Order, UserOrder } from "../data/models/order";
import { Payment } from "../data/models/payment";
import data from "../data/orders.json";
import * as _ from "lodash";
import { PriceListController } from "./pricelist.controller";
import { PriceList } from "../data/models/priceList";

export class OrderController {
  private orders: Order[] = [];
  private priceList: PriceList[] = [];
  private userOrders?: UserOrder[] = [];
  private paymentOwed: Payment[] =[];
  //private priceListController: PriceListController = new PriceListController();
  constructor(priceList: PriceList[]) {
    this.priceList = priceList;
  }

work(){
  const promise = new Promise((resolve, reject)=>{
    this.readOrders();
    resolve('');
  });
  promise.then(() =>{
    this.calculateTotal();
  }).then(()=>{
    this.calculateTotalOwed();
  });
}

 readOrders() {
    console.log('order => Reading orders');
    this.userOrders = data;
    console.log('order => Reading orders complete');
  }

  get Orders() {
    return this.orders;
  }

  get PaymentOwed(){return this.paymentOwed;}

  // getPriceList() {
  //   console.log('getting PriceList for orders');
  //   this.priceListController.readPriceList();
  //   this.priceList = this.priceListController.Menu; 
  //   console.log('getting PriceList for orders completed');
  // }

  calculateTotal() {
    console.log('order => calculating total for orders');
    this.userOrders?.forEach((x) => {
      const drink = this.priceList.find((p) => {
        return p.drink_name?.toLowerCase() == x.drink?.toLowerCase();
      });
      if (drink?.prices) {
        for (const [key, value] of Object.entries(drink.prices)) {
          if (key.toLowerCase() === x.size?.toLowerCase()) {
            x.price = value;
          }
        }
      }
    });
    console.log('order => calculating total for orders completed');
   
  }

  calculateTotalOwed(){
    console.log('order => calculating total owed for orders');
    let res: any =[];
   if(this.userOrders) {
      this.userOrders.forEach(function(item, index) {
        if (res.length === 0 
            || !res.some(function(elem: any) {return elem.user === item.user}) ) {
          res.push( { "user": item.user, "price": item.price})
        } else {
          for (var i = 0; i < res.length; i++) {
            if (res[i]["user"] === item["user"] 
                && (res[i]["price"] !== 1 && item["price"] !== 1)) {
              res[i]["price"] += item["price"]
            }
          }
        }
      });
      this.paymentOwed = res;
    }
    console.log('order => calculating total owed for orders completed');
  }


}
