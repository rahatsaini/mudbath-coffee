import { OrderController } from "./order.controller";
import { PaymentController } from "./payments.controller";
import { PriceListController } from "./pricelist.controller";

export class MiddleWare {
  pc: PriceListController = new PriceListController();

  order = new OrderController();

  payments = new PaymentController();

  constructor() {}

  work() {
    this.orderWork();
    this.paymentsWork();
    this.paymentsWork();
  }

  orderWork() {
    this.order.readOrders();
  }

  paymentsWork() {
    this.payments.readPayments();
  }

  priceListWork() {
    this.pc.readPriceList();
  }
}
