import { Order, UserOrder } from "../data/models/order";
import { Payment } from "../data/models/payment";
import data from "../data/orders.json";
import * as _ from "lodash";
import { PriceListController } from "./pricelist.controller";
import { PriceList } from "../data/models/priceList";

export class OrderController {
  private orders: Order[] = [];
  private priceList: PriceList[] = [];
  private userOrders: UserOrder[] = [];
  private paymentOwed: Payment[] = [];
  constructor(priceList: PriceList[]) {
    this.priceList = priceList;
  }

  async mainAsync() {
    try {
      this.orders = await this.readOrders();
      this.userOrders = await this.calculateTotal(this.orders);
      this.paymentOwed = await this.calculateTotalOwed(this.userOrders);
    } catch (e) {
      console.error(`error in orders controller: ${e}`);
    }
  }

  async readOrders(): Promise<Order[]> {
    console.info("order => Reading orders");
    return data;
  }

  get Orders() {
    return this.orders;
  }

  get PaymentOwed() {
    return this.paymentOwed;
  }

  async calculateTotal(userOrders: UserOrder[]): Promise<UserOrder[]> {
    console.info("order => calculating total for orders");
    userOrders.forEach((x) => {
      const drink = this.priceList.find((p) => {
        return p.drink_name?.toLowerCase() === x.drink?.toLowerCase();
      });
      if (drink?.prices) {
        for (const [key, value] of Object.entries(drink.prices)) {
          if (key.toLowerCase() === x.size?.toLowerCase()) {
            x.amount = value;
          }
        }
      }
    });
    console.info("order => calculating total for orders completed");
    
    return userOrders;
  }

  async calculateTotalOwed(userOrders: UserOrder[]): Promise<Payment[]> {
    
    console.info("order => calculating total owed for orders");
    let res: any = [];
    if (userOrders) {
      userOrders.forEach(function (item, index) {
        if (
          res.length === 0 ||
          !res.some(function (elem: any) {
            return elem.user === item.user;
          })
        ) {
          res.push({ user: item.user, amount: item.amount });
        } else {
          for (var i = 0; i < res.length; i++) {
            if (
              res[i]["user"] === item["user"] &&
              res[i]["amount"] !== 1 &&
              item["amount"] !== 1
            ) {
              res[i]["amount"] += item["amount"];
            }
          }
        }
      });
    }
    console.info("order => calculating total owed for orders completed");
    return res;
  }
}
