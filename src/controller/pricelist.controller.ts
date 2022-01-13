
import { PriceList } from '../data/models/priceList';
import data from '../data/prices.json';

export class PriceListController {
    private menu: PriceList[] = [];
    constructor(){
    }

    readPriceList(){
      this.menu = data;
      console.log(this.menu);
    }
   
    get Menu(){return this.menu;}

}