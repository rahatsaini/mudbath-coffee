import { BalanceController } from "../controller/balance";
import { PaymentController } from "../controller/payments.controller";

2
3
4
5


test('string with a single number should result in the number itself', () => {
    
  })

 
test('should return a user balance', () => {
    const balanceController = new BalanceController();
        const owed = [
            { user: 'coach', amount: 73 },
            { user: 'rochelle', amount: 52.25 }
        ];
        const paid = [
            { user: 'coach', amount: 50 },
            { user: 'rochelle', amount: 50 }
        ];
        const expectedResult = [
            { 
                user: 'coach',
                payment_total: 50,
                order_total: 73,
                balance: -23
            },{
            user: 'rochelle',
            payment_total: 50,
            order_total: 52.25,
            balance: -2.25
          }
        ];
        return balanceController.calculateTotal(owed, paid).then((data) =>{
            expect(data).toEqual(expectedResult);
        })
        //expect(balanceController.calculateTotal(owed, paid)).toBe(expectedResult);
  });