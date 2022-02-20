import { puppeteer } from "puppeteer";
import { fork } from 'child_process';

jest.setTimeout(90000);
describe('test Popap form', () =>{
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';
  
  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      // headless: false, // show
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });
 
  test('test show and close popap', async () => {
    await page.goto(baseUrl);
    const buttAdd = await page.$(`[class = head_add]`);
    buttAdd.click();
    const inputName = await page.$('[id = name]');
    inputName.type('Poco X3 pro');
    const inputCost = await page.$('[id = price]');
    inputCost.type('25000');
    const saving = await page.$('[id = sav]');
    saving.click();
    await page.waitForSelector('[id = name].valid');
  });

  afterAll(async () => {
    await browser.close();
  });
})
