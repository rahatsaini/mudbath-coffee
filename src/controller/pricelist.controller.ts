
import { PriceList } from '../data/models/priceList';
import data from '../data/prices.json';

export class PriceListController {
    private menu: PriceList[] = [];
    constructor(){
    }

    async readPriceList(){
      console.log('pricelist => reading price list data');
      this.menu = data;
      console.log('pricelist => reading price list data done');
    }
   
    get Menu(){return this.menu;}

}