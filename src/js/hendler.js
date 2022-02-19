import { arrCost, arrName } from './pseudoDB';

function chackFields(name, cost) {
  let flag = 1;
  if (!name) { flag = 2; return flag; }
  if (!cost) { flag = 3; return flag; }
  if (cost <= 0) { flag = 5; return flag; }
  const testCost = cost.match(/\D/igu);
  if (testCost) { flag = 4; return flag; }
  return flag;
}

function writeEdit(title, price) {
  arrName.push(title);
  arrCost.push(price);
}

function uppdeteEdit(flag, title, price) {
  arrName[flag] = title;
  arrCost[flag] = price;
}

function delitEdit(id) {
  arrName.splice(id, 1);
  arrCost.splice(id, 1);
}

export {
  chackFields, writeEdit, uppdeteEdit, delitEdit,
};
