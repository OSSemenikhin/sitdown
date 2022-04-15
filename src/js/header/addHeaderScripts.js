import { $$ } from '../plugins/choozzie.js';
import { selectRegionOpt, selectCategoryOpt } from './select.js';
import { addBurger } from './burger.js';

export const addHeaderScripts = () => {
   // selects
   if (document.getElementById("region__select")) {
    const selectRegion = $$.choozzie.create(selectRegionOpt);
  }
  if (document.getElementById("categories__select")) {
    const selectCategory = $$.choozzie.create(selectCategoryOpt);
  }
  //  burger
  addBurger();
}