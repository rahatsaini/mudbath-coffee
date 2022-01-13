import { Payment } from "../data/models/payment";
import { UserBalance } from "../data/models/user-balance";
import { OrderController } from "./order.controller";
import { PaymentController } from "./payments.controller";

export class BalanceController{
    userBalance: UserBalance[] = [];
    private paymentOwed?: Payment[] =[];
    private totalPayments: Payment[] = [] ;
    
    constructor(paymentOwed: Payment[], totalPayments: Payment[]){
        this.paymentOwed = paymentOwed;
        this.totalPayments = totalPayments;   
    }


    calculateTotal(){
        const promise =  new Promise((resolve,reject) =>
        {
           this.populateTotalPayments() 
           resolve('');
        });
        promise.then(()=>{
            this.populateUserBalanceOwed();
        })
    }

     private populateTotalPayments() {
         console.log('balance => populating total payments');
        this.totalPayments.forEach( x=> {
            let ub: UserBalance = new UserBalance();
            ub.user = x.user;
            ub.payment_total = x.amount;
            this.userBalance.push(ub);
        });
        console.log('balance => populating total payments done');
    }

    private populateUserBalanceOwed() {
        console.log('balance => populating total owed');
        this.userBalance.forEach( x => {
            const owed = this.paymentOwed?.find( p => p.user === x.user );
            console.log(owed);
            if(owed)
            {
                x.order_total = owed.amount;
                x.balance = x.payment_total - x.order_total;
            }
        });
        console.log(this.userBalance);
        console.log('balance => populating total owed done');
    }


    
}