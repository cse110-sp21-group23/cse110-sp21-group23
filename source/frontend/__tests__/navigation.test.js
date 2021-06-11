const loginURL = "http://127.0.0.1:5000/";
const dailyURL = "http://127.0.0.1:5000/daily";

describe("Navigation test:", () => {

    beforeAll(async () => {
        jest.setTimeout(20000);
        await page.goto(loginURL);
        await page.waitForTimeout(500);
        // Login first
        await page.$eval("#username-input", (e) => (e.value = "e@gmail.com"));
        await page.$eval("#password-input", (e) => (e.value = "asd"));
    
        await page.$eval("#signin-button", (e) => e.click());
    
        await page.waitForNavigation();
       
      }, 20000);


    // check landing page 
    it('Test1: Check landing page is on the Daily Page', async () => {
        let curURL = page.url(); 
        // ASK ABOUT THE CURRENT BASE OR WHATEVER 
        expect(curURL).toBe('http://127.0.0.1:5000/daily')

    })

    // click on week button from navigation bar 
    it('Test2: Have access to weekly page', async() => {
        
        await page.evaluate(() => {
            document.querySelector('navigation-bar').shadowRoot.querySelector('[data-page="weekly').click();
        });

        let curURL = page.url(); 

        expect(curURL).toBe('http://127.0.0.1:5000/weekly')

    })

    it('Test3: Check if the logo brings user back to home page (daily page)', async() => {
        
        await page.evaluate(() => {
            document.querySelector('top-navbar').click('a[href="/daily"]');
        });

        let curURL = page.url(); 

        expect(curURL).toBe('http://127.0.0.1:5000/daily')

    })

    it('Test3: Have access to daily page', async() => {
        
        await page.evaluate(() => {
            document.querySelector('navigation-bar').shadowRoot.querySelector('[data-page="daily').click();
        });

        let curURL = page.url(); 

        expect(curURL).toBe('http://127.0.0.1:5000/daily')

    })


/*
    // click on day btn from navigation bar
    // if /weekly
    it('Test5: Have access to daily page', async() => {
        
        await page.evaluate(() => {
            document.querySelector('[data-page="daily"]').click();
        });

        let curURL = page.url(); 

        expect(curURL).toBe('http://0.0.0.0:2014/daily')

    })
 
    // click on 23ANDME 
    // if /daily
    it('Test##: Check if logo directs the site to daily page', async () => {
        await page.evaluate(() => {
            document.querySelector('.logo').click();
        });
        let curURL = page.url(); 
        // ASK ABOUT THE CURRENT BASE OR WHATEVER 
        expect(curURL).toBe('http://0.0.0.0:2014/daily')
    })
    */

    // check it see if hide navigation bar works 

    // Back arrow history 
})