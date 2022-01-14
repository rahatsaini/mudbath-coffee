import { BalanceController } from "./balance";
import { OrderController } from "./order.controller";
import { PaymentController } from "./payments.controller";
import { PriceListController } from "./pricelist.controller";


export class MiddleWare {
  pc: PriceListController = new PriceListController();

  orderController?: OrderController;

  paymentsController = new PaymentController();

  balanceController?: BalanceController;
  constructor() {}

  async work() {
     await this.pc.mainAsync();
     this.orderController = new OrderController(this.pc.Menu);
     await this.orderController.mainAsync();
     await this.paymentsController.mainAsync();
     const paymentOwed = this.orderController?.PaymentOwed;
     const totalPayments = this.paymentsController.TotalPayments;
        if (paymentOwed && totalPayments) {
          this.balanceController = new BalanceController();
          const readUserBalanceAsync = this.balanceController.calculateTotal(paymentOwed, totalPayments);
          readUserBalanceAsync.then((data) =>{
            console.log(data);
          })
        }   
  }
}
