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

  async work() {
     this.pc.readPriceList();
     this.order = new OrderController(this.pc.Menu);
     await this.order.mainAsync();
     await this.payments.mainAsync();
     const paymentOwed = this.order?.PaymentOwed;
     const totalPayments = this.payments.TotalPayments;
        if (paymentOwed && totalPayments) {
          this.balanceController = new BalanceController(
            paymentOwed,
            totalPayments
          );
          this.balanceController.calculateTotal();
        }   
  }
}
