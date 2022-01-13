
import { PriceList } from '../data/models/priceList';
import data from '../data/prices.json';

export class PriceListController {
    private menu: PriceList[] = [];
    constructor(){
    }

    readPriceList(){
      this.menu = data;
    }
   
    get Menu(){return this.menu;}

}