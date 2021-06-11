const jestPuppeteerConfig = require('../jest-puppeteer.config');

const loginURL = 'http://127.0.0.1:5000/';
const dailyURL = 'http://127.0.0.1:5000/daily';

const dates = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let currDate = new Date();
let year = currDate.getFullYear();
let monthInd = currDate.getMonth();
let dateInd = currDate.getDate();
let dayInd = currDate.getDay();

describe('Date Picker Tests', () => {
  beforeAll(async () => {
    jest.setTimeout(20000);
    await page.goto(loginURL);
    await page.waitForTimeout(500);
    // Login first
    await page.$eval('#username-input', (e) => (e.value = 'e@gmail.com'));
    await page.$eval('#password-input', (e) => (e.value = 'asd'));

    await page.$eval('#signin-button', (e) => e.click());

    await page.waitForNavigation();
  }, 20000);

  it('Test 1: Check if date-picker has correct month-text', async () => {
    await page.waitForTimeout(1000);
    const monthText = await page.evaluate(() => {
      return document
        .querySelector('daily-page')
        .shadowRoot.querySelector('date-picker')
        .shadowRoot.querySelector('#month-text').innerHTML;
    });
    expect(monthText).toBe(days[dayInd]);
  }, 20000);

  it('Test 2: Check if date-picker has correct date-text', async () => {
    const dateText = await page.evaluate(() => {
      return document
        .querySelector('daily-page')
        .shadowRoot.querySelector('date-picker')
        .shadowRoot.querySelector('.full-date > h1').innerHTML;
    });
    expect(dateText).toBe(months[monthInd] + ' ' + dates[dateInd] + ' ' + year);
  }, 20000);

  it('Test 3: Check if clicking on right-arrow changes month-text to next day correctly', async () => {
    currDate = new Date(year, monthInd, dateInd + 1);
    year = currDate.getFullYear();
    monthInd = currDate.getMonth();
    dateInd = currDate.getDate();
    dayInd = currDate.getDay();
    await page.waitForTimeout(1000);

    const next = await (
      await page.evaluateHandle(
        'document.querySelector("daily-page").shadowRoot.querySelector("date-picker").shadowRoot.querySelector("#next")'
      )
    ).asElement();

    await next.click();
    await page.waitForTimeout(3000);

    const nextMT = await page.evaluate(() => {
      return document
        .querySelector('daily-page')
        .shadowRoot.querySelector('date-picker')
        .shadowRoot.querySelector('.full-date > h2').innerHTML;
    });

    expect(nextMT).toBe(days[dayInd]);
  }, 20000);

  it('Test 4: Check if clicking on right-arrow changes date-text to next day correctly', async () => {
    const nextDT = await page.evaluate(() => {
      return document
        .querySelector('daily-page')
        .shadowRoot.querySelector('date-picker')
        .shadowRoot.querySelector('.full-date > h1').innerHTML;
    });

    expect(nextDT).toBe(months[monthInd] + ' ' + dates[dateInd] + ' ' + year);
  }, 20000);

  it('Test 5: Check if clicking on left-arrow changes month-text to prev day correctly', async () => {
    // Calc new date
    currDate = new Date(currDate - 86400000);
    year = currDate.getFullYear();
    monthInd = currDate.getMonth();
    dateInd = currDate.getDate();
    dayInd = currDate.getDay();

    await page.waitForTimeout(1000);

    // Grab the prev arrow
    const prev = await (
      await page.evaluateHandle(
        'document.querySelector("daily-page").shadowRoot.querySelector("date-picker").shadowRoot.querySelector("#prev")'
      )
    ).asElement();

    // Click the prev arrow
    await prev.click();

    // Grab the month text
    const prevMT = await page.evaluate(() => {
      return document
        .querySelector('daily-page')
        .shadowRoot.querySelector('date-picker')
        .shadowRoot.querySelector('.full-date > h2').innerHTML;
    });

    expect(prevMT).toBe(days[dayInd]);
  }, 20000);

  it('Test 6: Check if clicking on left-arrow changes date-text to prev day correctly', async () => {
    const prevDT = await page.evaluate(() => {
      return document
        .querySelector('daily-page')
        .shadowRoot.querySelector('date-picker')
        .shadowRoot.querySelector('.full-date > h1').innerHTML;
    });

    expect(prevDT).toBe(months[monthInd] + ' ' + dates[dateInd] + ' ' + year);
  }, 20000);
});
