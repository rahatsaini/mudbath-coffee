import { Payment } from "../data/models/payment";
import { UserBalance } from "../data/models/user-balance";

export class BalanceController {
  private userBalance: UserBalance[] = [];

  constructor() {}

  get UserBalance(): UserBalance[] {
    return this.userBalance;
  }

  async calculateTotal(paymentOwed: Payment[], totalPayments: Payment[]) {
    this.userBalance = await this.populateTotalPayments(totalPayments);
    this.userBalance = await this.populateUserBalanceOwed(
      this.userBalance,
      paymentOwed
    );
    return this.userBalance;
  }

  async populateTotalPayments(
    totalPayments: Payment[]
  ): Promise<UserBalance[]> {
    console.info("balance => populating total payments");
    let res: any = [];
    totalPayments.forEach((x) => {
      let ub: UserBalance = new UserBalance();
      ub.user = x.user;
      ub.payment_total = x.amount;
      res.push(ub);
    });

    console.info("balance => populating total payments done");
    return res;
  }

  async populateUserBalanceOwed(
    userBalance: UserBalance[],
    paymentOwed: Payment[]
  ): Promise<UserBalance[]> {
    console.info("balance => populating total owed");
    userBalance.forEach((x) => {
      const owed = paymentOwed.find((p) => p.user === x.user);
      if (owed) {
        x.order_total = owed.amount;
        x.balance = x.payment_total - x.order_total;
      }
    });
    console.info("balance => populating total owed done");
    return userBalance;
  }
}
