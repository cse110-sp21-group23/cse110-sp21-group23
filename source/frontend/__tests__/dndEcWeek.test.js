const baseURL = 'http://127.0.0.1:5000'
/**
 * Helper function for dragging and dropping elements on the page natively through JS. (Puppeteer alternatives just did 
 * not work)
 * @param {*} source - The object we're dragging 
 * @param {*} target - Where we're dragging the object to
 */
 async function dragAndDrop(source, target) {
    await page.evaluate((source, target) => {
        let event
        event = document.createEvent("CustomEvent");
        event.initCustomEvent("mousedown", true, true, null);
        event.clientX = source.getBoundingClientRect().left;
        event.clientY = source.getBoundingClientRect().top;
        source.dispatchEvent(event);

        event = document.createEvent("CustomEvent");
        event.initCustomEvent("dragstart", true, true, null);
        event.clientX = source.getBoundingClientRect().left;
        event.clientY = source.getBoundingClientRect().top;
        source.dispatchEvent(event);

        event = document.createEvent("CustomEvent");
        event.initCustomEvent("drag", true, true, null);
        event.clientX = source.getBoundingClientRect().left;
        event.clientY = source.getBoundingClientRect().top;
        source.dispatchEvent(event);

        event = document.createEvent("CustomEvent");
        event.initCustomEvent("dragover", true, true, null);
        event.clientX = target.getBoundingClientRect().left;
        event.clientY = target.getBoundingClientRect().top;
        target.dispatchEvent(event);

        event = document.createEvent("CustomEvent");
        event.initCustomEvent("drop", true, true, null);
        event.clientX = target.getBoundingClientRect().left;
        event.clientY = target.getBoundingClientRect().top;
        target.dispatchEvent(event);

        event = document.createEvent("CustomEvent");
        event.initCustomEvent("dragend", true, true, null);
        event.clientX = target.getBoundingClientRect().left;
        event.clientY = target.getBoundingClientRect().top;
        target.dispatchEvent(event);
    }, source, target); 
}

describe('E2E testing for dragging/dropping between different lists', ()=> { 
    beforeAll(async () => {
        await jest.setTimeout(30000)
        await page.goto('http://127.0.0.1:5000/')
        await page.waitForTimeout(500);
    });

    it('Test1: Login and go to July 7, 1950', async () => {
        //Login 
        await page.$eval('#username-input', e => e.value = "e@gmail.com")
        await page.$eval('#password-input', e => e.value = "asd")
        await page.$eval('#signin-button', e => e.click())
        await page.waitForTimeout(1000);

        //Goto the weekly page 
        await page.evaluate(()=> { 
                let weeklyButt = document.querySelector("navigation-bar").shadowRoot.querySelector(".sidebar button:nth-child(3)"); 
                weeklyButt.click(); 
        });
        await page.waitForTimeout(1000); 

        expect(page.url()).toBe(`${baseURL}/weekly`); 
    }, 10000); 

    it('Test2: Change the week three times', async()=> { 
        //Get the first date in the range of 8
        let currDate = await page.evaluate(()=> { 
            let dateTitle = document.querySelector("weekly-page").shadowRoot.querySelector("week-picker").shadowRoot.querySelector("#date").innerHTML; 
            let dateSplit = dateTitle.split(' '); 
            let dateNew = dateSplit[0] + ' ' + dateSplit[1] + ' ' +  dateSplit[2]; 
            return dateNew;
        }); 

        //Click on next 3 times 
        let nextButt = await (await page.evaluateHandle(`document.querySelector("weekly-page").shadowRoot.querySelector("week-picker").shadowRoot.querySelector("#next")`)).asElement(); 
        await nextButt.click(); 
        await nextButt.click(); 
        await nextButt.click(); 

        //Get the first date again 
        let dateAfter = await page.evaluate(()=> { 
            let dateTitle = document.querySelector("weekly-page").shadowRoot.querySelector("week-picker").shadowRoot.querySelector("#date").innerHTML; 
            let dateSplit = dateTitle.split(' '); 
            let dateNew = dateSplit[0] + ' ' + dateSplit[1] + ' ' +  dateSplit[2]; 
            return dateNew;
        });   

        expect(dateAfter).toEqual(currDate); 
    }, 30000); 

    it ('Test3: Drag element from first day to third day', async()=> { 

    }); 

})