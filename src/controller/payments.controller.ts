import { Payment } from "../data/models/payment";
import data from "../data/payments.json";
import * as _ from "lodash";
import { captureRejections } from "events";
export class PaymentController {
  private payments: Payment[] = [];
  private totalPayments: Payment[] = [];
  constructor() {}

  async mainAsync() {
    try {
      this.payments = await this.readPayments();
      this.totalPayments = await this.calculateTotalForEachUser(this.payments);
    } catch (e) {
      console.error(`error in payment controller: ${e}`);
    }
  }

  async readPayments(): Promise<Payment[]> {
    console.log("payment => reading payment data");
    console.log("payment => reading payment data completed");
    return data;
  }

  async calculateTotalForEachUser(payments: Payment[]): Promise<Payment[]> {
    console.log("payment => calculating total for each user");
    let res: any = [];
    payments.forEach(function (item, index) {
      if (
        res.length === 0 ||
        !res.some(function (elem: any) {
          return elem.user === item.user;
        })
      ) {
        res.push(item);
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
    console.log("payment => calculating total for each user completed");
    return res;
  }

  get Payments() {
    return this.payments;
  }
  get TotalPayments() {
    return this.totalPayments;
  }
}
