"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceListController = void 0;
const prices_json_1 = __importDefault(require("../data/prices.json"));
class PriceListController {
    constructor() {
        this.menu = [];
    }
    readPriceList() {
        this.menu = prices_json_1.default;
        console.log(this.menu);
    }
    get Menu() { return this.menu; }
}
exports.PriceListController = PriceListController;
