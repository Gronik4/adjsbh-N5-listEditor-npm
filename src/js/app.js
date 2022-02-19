import pencil from '../img/p.jpg';
import { arrName, arrCost } from './pseudoDB';
import {
  chackFields, writeEdit, uppdeteEdit, delitEdit,
} from './hendler';

const table = document.getElementById('et');
function drowList() {
  const allEntry = document.querySelectorAll('.tr');
  allEntry.forEach((i) => {
    const item = i.parentElement;
    item.remove();
  });
  for (let i = 0; i < arrName.length; i += 1) {
    const insert = `<tr class="tr" data-id="${i}"><td class="left">${arrName[i]}</td><td class="numb">${arrCost[i]}</td><td class="R"><img class="img" src="${pencil}"></td><td class="L">X</td></tr>`;
    table.innerHTML += insert;
  }
}
drowList();

function closеPopap() {
  document.getElementById('name').value = '';
  document.getElementById('price').value = '';
  document.getElementById('sav').removeEventListener('click', prependWrite); // eslint-disable-line
  document.getElementById('sav').removeEventListener('click', prependUppdate); // eslint-disable-line
  document.getElementById('pop').style.display = 'none';
}

function showError(item) {
  event.preventDefault(); // eslint-disable-line
  let frase = '';
  const err = document.querySelector('.erShow');
  err.style.display = 'block';
  const plaseE = document.querySelector('.error-text');
  switch (item) {
    case 2:
      frase = 'Заполните поле';
      err.style.top = '100px';
      break;
    case 3:
      frase = 'Заполните поле';
      err.style.top = '155px';
      break;
    case 4:
      frase = 'В поле должны быть только цифры';
      err.style.top = '155px';
      break;
    case 5:
      frase = 'Нулевых и отирцательных цен не бывает';
      err.style.top = '155px';
      break;
    default:
  }
  plaseE.innerHTML = frase;
  setTimeout(() => {
    err.style.display = 'none';
  }, 1500);
}

function prependWrite(event) {
  event.preventDefault();
  const formD = document.getElementById('pop');
  const form = new FormData(formD);
  const title = form.get('name');
  const price = form.get('price');
  const chack = chackFields(title, price);
  if (chack === 1) {
    writeEdit(title, price);
    drowList();
    closеPopap();
  } else {
    showError(chack);
  }
}

function prependUppdate(event) {
  event.preventDefault();
  const formD = document.getElementById('pop');
  const flag = formD.dataset.edit;
  const form = new FormData(formD);
  const title = form.get('name');
  const price = form.get('price');
  const chack = chackFields(title, price);
  if (chack === 1) {
    uppdeteEdit(flag, title, price);
    drowList();
    formD.dataset.edit = 'a';
    closеPopap();
  } else {
    showError(chack);
  }
}

function showPopap() {
  event.preventDefault(); // eslint-disable-line
  const popap = document.getElementById('pop');
  if (popap.style.display === 'block') {
    popap.style.display = 'none';
    closеPopap();
  } else {
    popap.style.display = 'block';
    const flag = popap.dataset.edit;
    document.getElementById('can').addEventListener('click', closеPopap);
    const buttSev = document.getElementById('sav');
    if (flag === 'a') {
      buttSev.addEventListener('click', prependWrite);
    } else {
      buttSev.addEventListener('click', prependUppdate);
    }
  }
}

document.querySelector('.head_add').addEventListener('click', showPopap);

function hendlerClick(event) {
  if (event.target.className === 'img') {
    const tr = event.target.closest('tr');
    const idEdit = tr.dataset.id;
    const name = tr.firstChild.textContent;
    const cost = tr.firstChild.nextSibling.textContent;
    document.getElementById('pop').dataset.edit = idEdit;
    showPopap();
    const title = document.getElementById('name');
    const price = document.getElementById('price');
    title.value = name;
    price.value = cost;
    return;
  }
  if (event.target.className === 'L') {
    const tr = event.target.closest('tr');
    const idEdit = tr.dataset.id;
    delitEdit(idEdit);
    event.preventDefault();
    drowList();
    closеPopap();
  }
}

table.addEventListener('click', hendlerClick);
