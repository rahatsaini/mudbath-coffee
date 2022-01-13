import { BalanceController } from "./balance";
import { OrderController } from "./order.controller";
import { PaymentController } from "./payments.controller";
import { PriceListController } from "./pricelist.controller";

export class MiddleWare {
  pc: PriceListController = new PriceListController();

  order?: OrderController;

  payments = new PaymentController();

  balanceController?: BalanceController;
  constructor() {}

  work() {
    const promise = new Promise((resolve,reject) =>{
      this.priceListWork();
        resolve('');
    });
    promise.then(()=>{
      this.paymentsWork();
    }).then(()=>{
      this.order = new OrderController(this.pc.Menu);
      this.orderWork();
    }).then(()=>{
      const paymentOwed = this.order?.PaymentOwed;
      const totalPayments = this.payments.TotalPayments;
      console.log(paymentOwed);
      console.log(totalPayments);
      if(paymentOwed && totalPayments)
      {
        this.balanceController = new BalanceController(paymentOwed, totalPayments);
      }
    })
    
  }

  orderWork() {
    this.order?.work();
  }

  paymentsWork() {
    this.payments.work();
  }

  priceListWork() {
    this.pc.readPriceList();
  }
}
