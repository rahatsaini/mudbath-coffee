
import { Payment } from '../data/models/payment';
import { PriceList } from '../data/models/priceList';
import data from '../data/payments.json';

export class PaymentController {
    private payments: Payment[] = [];
    constructor(){
    }

    readPayments(){
      this.payments = data;
    }
   
    get Payments(){return this.payments;}

}