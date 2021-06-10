const jestPuppeteerConfig = require("../jest-puppeteer.config");

const loginURL = "http://127.0.0.1:5000/";
const dailyURL = "http://127.0.0.1:5000/daily";

const dates = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let currDate = new Date();
let year = currDate.getFullYear();
let monthInd = currDate.getMonth();
let dateInd = currDate.getDate();
let dayInd = currDate.getDay();

describe("Date Picker Tests", () => {
  beforeAll(async () => {
    jest.setTimeout(100000);
    await page.goto(loginURL);
    await page.waitForTimeout(500);
    // Login first
    await page.$eval("#username-input", (e) => (e.value = "e@gmail.com"));
    await page.$eval("#password-input", (e) => (e.value = "asd"));

    await page.$eval("#signin-button", (e) => e.click());

    await page.waitForNavigation();
    console.log(page.url());
  }, 20000);

  it("Test 1: Check if date-picker has correct month-text", async () => {

    const monthText = await page.evaluate(() => {
      return document
        .querySelector("daily-page")
        .shadowRoot.querySelector("date-picker")
        .shadowRoot.querySelector(".full-date > h2").innerHTML;
    });
    expect(monthText).toBe(days[dayInd]);
  }, 100000);

  it("Test 2: Check if date-picker has correct date-text", async () => {
    const dateText = await page.evaluate(() => {
      return document
        .querySelector("daily-page")
        .shadowRoot.querySelector("date-picker")
        .shadowRoot.querySelector(".full-date > h1").innerHTML;
    });
    expect(dateText).toBe(months[monthInd] + " " + dates[dateInd] + " " + year);
  }, 100000);

  it("Test 3: Check if clicking on right-arrow changes month-text to next day correctly", async () => {
    currDate = new Date(year, monthInd, dateInd + 1);
    year = currDate.getFullYear();
    monthInd = currDate.getMonth();
    dateInd = currDate.getDate();
    dayInd = currDate.getDay();
    await page.waitForTimeout(1000);

    const next = await (
      await page.evaluateHandle(
        `document.querySelector("daily-page").shadowRoot.querySelector("date-picker").shadowRoot.querySelector("#next")`
      )
    ).asElement();

    await next.click();
    await page.waitForTimeout(3000); 

    const nextMT = await page.evaluate(() => {
      return document
        .querySelector("daily-page")
        .shadowRoot.querySelector("date-picker")
        .shadowRoot.querySelector(".full-date > h2").innerHTML;
    });

    expect(nextMT).toBe(days[dayInd]);
  }, 100000);

  it("Test 4: Check if clicking on right-arrow changes date-text to next day correctly", async () => {
    const nextDT = await page.evaluate(() => {
      return document
        .querySelector("daily-page")
        .shadowRoot.querySelector("date-picker")
        .shadowRoot.querySelector(".full-date > h1").innerHTML;
    });

    expect(nextDT).toBe(months[monthInd] + " " + dates[dateInd] + " " + year);
  }, 100000);

  it("Test 5: Check if clicking on left-arrow changes month-text to prev day correctly", async () => {
    //Calc new date
    currDate = new Date(currDate - 86400000);
    year = currDate.getFullYear();
    monthInd = currDate.getMonth();
    dateInd = currDate.getDate();
    dayInd = currDate.getDay();

    await page.waitForTimeout(1000); 

    //Grab the prev arrow 
    const prev = await (
      await page.evaluateHandle(
        `document.querySelector("daily-page").shadowRoot.querySelector("date-picker").shadowRoot.querySelector("#prev")`
      )
    ).asElement();

    //Click the prev arrow 
    await prev.click();

    //Grab the month text
    const prevMT = await page.evaluate(() => {
      return document
        .querySelector("daily-page")
        .shadowRoot.querySelector("date-picker")
        .shadowRoot.querySelector(".full-date > h2").innerHTML;
    });

    expect(prevMT).toBe(days[dayInd]);
  }, 100000);

  it("Test 6: Check if clicking on left-arrow changes date-text to prev day correctly", async () => {

    const prevDT = await page.evaluate(() => {
      return document
        .querySelector("daily-page")
        .shadowRoot.querySelector("date-picker")
        .shadowRoot.querySelector(".full-date > h1").innerHTML;
    });

    expect(prevDT).toBe(months[monthInd] + " " + dates[dateInd] + " " + year);
  }, 100000);
});

// const datePicker = await page.$eval('#datePickerDiv');
// await page.waitForTimeout(500);
// expect(datePicker).not.toBe(null)
// const datePicker = document.createElement('date-picker');
// expect(datePicker.shadowRoot.getElementById('month-text')).toBe('Mon');
// const shadowRoots = await page.$eval("#datePickerDiv", el => el.shadowRoot.getElementById('month-text'));
// //const dateText = await page.$eval("shadowRoots[0].shadowRoot.getElementById('month-text');")
// const shadowRoots = document.getElementsByTagName('date-picker');
// const monthText = await page.$eval("shadowRoots[0].shadowRoot.getElementById('month-text')")
// expect(monthText).toBe("Mon");
// const dailyPageShadow = await page.$$('daily-page');
// console.log(dailyPageShadow)
// const datePickerShadow = await page.$$(`${dailyPageShadow} > div > date-picker`);
// console.log(datePickerShadow);
// //const monthText = await page.$eval(shadow.querySelector("#month-text"))
// expect(shadow).not.toBe(null);
// const monthText = document.querySelector("daily-page").shadowRoot.querySelector("date-picker").shadowRoot.querySelector("month-text");
// console.log(monthText)
// expect(monthText).toBe("Mon");

// const loginURL = "http://127.0.0.1:5000/";
// const dailyURL = "http://127.0.0.1:5000/daily";

// describe('Authentication flow', () => {
//     beforeAll(async () => {
//         await page.goto(loginURL);
//         await page.waitForTimeout(500);
//     });

//     it('Test1: Initial Login Page - check if form exists', async () => {
//         const loginPage = await page.$$('login-page')
//         expect(loginPage).not.toBe(null)
//     });

//     it('Test2: Login - check if page changes after failed login', async () => {
//         await page.$eval('#username-input', e => e.value = "e@gmail.com")
//         await page.$eval('#password-input', e => e.value = "wrong password")
//         await page.$eval('#signin-button', e => e.click())
//         await page.waitForTimeout(500);

//         expect(page.url()).toBe(loginURL);
//     });

//     it('Test3: Redirect - check if page redirects to login if URL has changed without token', async () => {
//         await page.goto(dailyURL);
//         await page.waitForTimeout(500);

//         expect(page.url()).toBe(loginURL);
//     });

//     it('Test4: Login - check if page changes after successful login', async () => {
//         await page.$eval('#username-input', e => e.value = "e@gmail.com")
//         await page.$eval('#password-input', e => e.value = "asd")
//         await page.$eval('#signin-button', e => e.click())
//         await page.waitForTimeout(500);

//         expect(page.url()).toMatch(dailyURL)
//     });

//     it('Test5: Check if date-picker exists', async () => {
//         // const datePicker = await page.$eval('#datePickerDiv');
//         // await page.waitForTimeout(500);
//         // expect(datePicker).not.toBe(null)

//         // const datePicker = document.createElement('date-picker');
//         // expect(datePicker.shadowRoot.getElementById('month-text')).toBe('Mon');
//         // const shadowRoots = await page.$eval("#datePickerDiv", el => el.shadowRoot.getElementById('month-text'));
//         // //const dateText = await page.$eval("shadowRoots[0].shadowRoot.getElementById('month-text');")

//         // const shadowRoots = document.getElementsByTagName('date-picker');
//         // const monthText = await page.$eval("shadowRoots[0].shadowRoot.getElementById('month-text')")
//         // expect(monthText).toBe("Mon");

//         // const dailyPageShadow = await page.$$('daily-page');
//         // console.log(dailyPageShadow)
//         // const datePickerShadow = await page.$$(`${dailyPageShadow} > div > date-picker`);
//         // console.log(datePickerShadow);
//         // //const monthText = await page.$eval(shadow.querySelector("#month-text"))
//         // expect(shadow).not.toBe(null);

//         // const monthText = document.querySelector("daily-page").shadowRoot.querySelector("date-picker").shadowRoot.querySelector("month-text");
//         // console.log(monthText)

//         // expect(monthText).toBe("Mon");

//         const dailyPageShadow = (await page.$$('daily-page')).innerHTML;
//         await page.waitForTimeout(4000);
//         //const dailyPageShadow = document.querySelector('daily-page').baseURI;
//         console.log(dailyPageShadow)

//         const datePicker = await page.evaluate(() => {
//             return Array.from(document.querySelector('daily-page'))
//         })
//         console.log(datePicker);
//     });
// })
