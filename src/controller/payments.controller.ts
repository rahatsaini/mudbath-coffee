
import { Payment } from '../data/models/payment';
import data from '../data/payments.json';
import * as _ from "lodash"
export class PaymentController {
    private payments: Payment[] = [];
    private totalPayments: Payment[] = [] ;
    constructor(){
    }
    
    work(){
      const promise = new Promise((resolve,reject) =>{
        this.readPayments();
        resolve('');
      });
      promise.then(()=>{
        this.calculateTotalForEachUser();
      });
    }

    readPayments(){
      console.log('payment => reading payment data');
      this.payments = data;
      console.log('payment => reading payment data completed');
    }
   
    calculateTotalForEachUser(){
      console.log('payment => calculating total for each user');
      let res: any =[];
      this.Payments.forEach(function(item, index) {
        if (res.length === 0 
            || !res.some(function(elem: any) {return elem.user === item.user}) ) {
          res.push(item)
        } else {
          for (var i = 0; i < res.length; i++) {
            if (res[i]["user"] === item["user"] 
                && (res[i]["amount"] !== 1 && item["amount"] !== 1)) {
              res[i]["amount"] += item["amount"]
            }
          }
        }
      });
      this.totalPayments = res;
      console.log('payment => calculating total for each user completed');
  
}

    get Payments(){return this.payments;}
    get TotalPayments(){return this.totalPayments;}

}