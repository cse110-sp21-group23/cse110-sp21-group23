//import EntryCreator from "../src/js/components/EntryCreatorDay/EntryCreator"

describe('E2E testing for dragging within same list', () => {
    beforeAll(async () => {
        await jest.setTimeout(30000)
        await page.goto('http://127.0.0.1:5000/')
        await page.waitForTimeout(500);
    });

    it('Test1: Drag from top to bottom of list', async () => {
        await page.$eval('#username-input', e => e.value = "e@gmail.com")
        await page.$eval('#password-input', e => e.value = "asd")
        await page.$eval('#signin-button', e => e.click())
        await page.waitForTimeout(1000);
        let bodyHTML = await (await page.evaluateHandle(`document.querySelector("body > div:nth-child(6) > daily-page").shadowRoot.querySelector("#entryCreatorDiv > entry-creator").shadowRoot.querySelector("#entryContainer")`)).asElement();
        let arrow = await (await page.evaluateHandle(`document.querySelector("body > div:nth-child(6) > daily-page").shadowRoot.querySelector("#datePickerDiv > date-picker").shadowRoot.querySelector("#next")`)).asElement();
        await page.waitForTimeout(5000000);
        //console.log(bodyHTML);
        //await arrow.click();  
        //await bodyHTML.click();
        // let bodyHTML = await page.$$eval('daily-page', (what)=>{ 
        //     console.log(what); 
        // })
        // let bodyHTML = await page.$$('daily-page'); 
        // console.log(bodyHTML.shadowRoot);
        //console.log(bodyHTML); 
    }, 50000000);
});

