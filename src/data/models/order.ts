
export class Order {
    user?: string;
    drink?: string;
    size?: string;
}

export class UserOrder extends Order {
   amount?: number = 0;
}

