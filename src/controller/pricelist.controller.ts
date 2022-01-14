import { PriceList } from "../data/models/priceList";
import data from "../data/prices.json";

export class PriceListController {
  private menu: PriceList[] = [];
  constructor() {}

  async mainAsync() {
    try {
      this.menu = await this.readPriceList();
    } catch (e) {
      console.error(`error in price list controller: ${e}`);
    }
  }

  async readPriceList(): Promise<PriceList[]> {
    console.log("priceList => reading price list data");
    return data;
  }

  get Menu() {
    return this.menu;
  }
}
