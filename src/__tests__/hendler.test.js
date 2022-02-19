import {
  chackFields, delitEdit, uppdeteEdit, writeEdit,
} from '../js/hendler';
import { arrCost, arrName } from '../js/pseudoDB';

test.each([
  ['', 123, 2],
  ['aaa', '', 3],
  ['aaa', -222, 5],
  ['aaa', '22ss', 4],
  ['aaa', '555', 1],
])('testing chackFields', (nm, cs, exp) => {
  expect(chackFields(nm, cs)).toBe(exp);
});

test('testing writeEdit', () => {
  writeEdit('ddd', 123);
  expect(arrName.length).toBe(4);
  expect(arrCost.length).toBe(4);
});

test('testing uppdeteEdit', () => {
  const flag = 3;
  uppdeteEdit(flag, 'ddd-1', 1230);
  expect(arrName[flag]).toBe('ddd-1');
  expect(arrCost[flag]).toBe(1230);
});

test('testing delitEdit', () => {
  delitEdit(3);
  expect(arrName.length).toBe(3);
  expect(arrCost.length).toBe(3);
});
