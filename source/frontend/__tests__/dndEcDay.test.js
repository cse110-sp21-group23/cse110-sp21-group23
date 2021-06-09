//import EntryCreator from "../src/js/components/EntryCreatorDay/EntryCreator"


describe('E2E testing for dragging within same list', () => {
    beforeAll(async () => {
        await jest.setTimeout(30000)
        await page.goto('http://127.0.0.1:5000/')
        await page.waitForTimeout(500);
    });

    it('Test1: Login and go to July 7, 1950', async () => {
        await page.$eval('#username-input', e => e.value = "e@gmail.com")
        await page.$eval('#password-input', e => e.value = "asd")
        await page.$eval('#signin-button', e => e.click())
        await page.waitForTimeout(1000);
        await page.evaluate(()=> { 
            let calendar = document.querySelector("daily-page").shadowRoot.querySelector("date-picker").shadowRoot.querySelector("calendar-picker"); 
            // Month is zero indexxed
            calendar.date = new Date(1950,6,7); 
        });

        let dateText = await page.evaluate(()=> { 
            let dP = document.querySelector("daily-page").shadowRoot.querySelector("date-picker").shadowRoot.querySelector("#date-text").innerHTML; 
            return dP;
        }); 

        expect(dateText).toEqual("Jul 7 1950"); 
        await page.waitForTimeout(5000); 
        // await bodyHTML.click(); 
        // await bodyHTML.click(); 

        //let arrow = await (await page.evaluateHandle(`document.querySelector("body > div:nth-child(6) > daily-page").shadowRoot.querySelector("#datePickerDiv > date-picker").shadowRoot.querySelector("#next")`)).asElement();
        //console.log(bodyHTML);
        //await arrow.click();  
        //await bodyHTML.click();
        // let bodyHTML = await page.$$eval('daily-page', (what)=>{ 
        //     console.log(what); 
        // })
        // let bodyHTML = await page.$$('daily-page'); 
        // console.log(bodyHTML.shadowRoot);
        //console.log(bodyHTML); 
    }, 15000)

    it('Test2: Ensure there are five entries on the page', async () => { 
        let numEntries = await page.evaluate(()=> { 
            let entries = document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer").children; 
            return entries.length; 
        }); 
        expect(numEntries).toEqual(5); 
    }); 

    it('Test3: Drag entry at second index to fourth index', async () => { 
        let entry2 = await (await page.evaluateHandle(`document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer entry-comp:nth-child(2)").shadowRoot.querySelector("li")`)).asElement();
        const bBox2 = await entry2.boundingBox(); 
        let entry4 = await (await page.evaluateHandle(`document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer entry-comp:nth-child(4)").shadowRoot.querySelector("li")`)).asElement();
        const bBox4 = await entry4.boundingBox(); 

        // console.log("bboxes: " + bBox2.x + ' ' + bBox4.x); 
        // console.log("widths" + bBox2.width + ' ' + bBox4.width); 
        // console.log("heights" + bBox2.height + ' ' + bBox4.height); 
        // console.log("bboxes" + bBox2.y + ' ' +  bBox4.y)
        await page.waitForTimeout(10000); 

        console.log (`STarting at ${bBox2.x + bBox2.width / 2}, ${bBox2.y + bBox2.height / 2}` ); 
        await page.mouse.move(bBox2.x + bBox2.width / 2, bBox2.y + bBox2.height / 2); 
        await page.mouse.down(); 

        console.log(`Ending at ${bBox4.x + bBox4.width / 2}, ${bBox4.y + bBox4.height / 2}`); 
        await page.mouse.move(bBox4.x + bBox4.width / 2, bBox4.y + bBox4.height / 2);
        await page.mouse.up(); 
        await page.waitForTimeout(10000); 
    }, 50000); 
});

