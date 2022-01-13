import { Prices } from "./prices";

export class PriceList{
 name: string;
 price: Prices;

 constructor(name: string, prices: Prices)
 {
     this.name = name;
     this.price = prices;
 }
}