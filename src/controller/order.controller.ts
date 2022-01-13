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
  private paymentOwed?: Payment[] =[];
  private priceListController: PriceListController = new PriceListController();
  constructor() {}

 readOrders() {
    this.userOrders = data;
    this.getPriceList();
  }

  get Orders() {
    return this.orders;
  }

  getPriceList() {
    this.priceListController.readPriceList();
    this.priceList = this.priceListController.Menu;
    this.calculateTotal();
  }

  calculateTotal() {
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
    this.calculateTotalOwed();
  }

  calculateTotalOwed(){
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
  }


}
