import { Puppeteer } from "puppeteer";

jest.setTimeout(30000);
describe('test Popap form', () =>{
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    browser = await Puppeteer.launch({
      headless: false, // show
      slowMo: 100,
      devtools: true, // show devTools
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
