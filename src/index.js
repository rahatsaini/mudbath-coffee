"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pricelist_controller_1 = require("./controller/pricelist.controller");
const pc = new pricelist_controller_1.PriceListController();
pc.readPriceList();
