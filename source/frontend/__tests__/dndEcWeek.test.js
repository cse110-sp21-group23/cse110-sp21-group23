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
        let dateSplit = await page.evaluate(()=> { 
            let dateTitle = document.querySelector("weekly-page").shadowRoot.querySelector("week-picker").shadowRoot.querySelector("#date").innerHTML; 
            return dateTitle.split(' '); 
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

        //Add 21 days (3 weeks) to current date
        let currDate =  dateSplit[0] + ' ' + dateSplit[1] + ' ' +  dateSplit[2];
        let tempDate = new Date(currDate); 
        tempDate.setDate(tempDate.getDate() + 21); 
        currDate = tempDate.toLocaleString('default', {month: 'long'}) + " " + tempDate.getDate() + ", " + tempDate.getFullYear(); 

        expect(dateAfter).toEqual(currDate); 
    }, 30000); 

    it ('Test3: Drag first element from first day to second element on third day', async()=> { 
        //Grab first entry content in first day
        let entry1Body = await page.evaluate(() =>{ 
            let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.monday entry-creator-week").shadowRoot.querySelector("entry-comp:nth-child(1)").shadowRoot.querySelector("#content").innerHTML; 
            return content; 
        }); 
        //Grab second entry content in third day
        let entry2Body = await page.evaluate(()=> { 
            let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.wednesday entry-creator-week").shadowRoot.querySelector("entry-comp:nth-child(2)").shadowRoot.querySelector("#content").innerHTML; 
        });

        //Grab entries to DnD
        let entry1 = await (await page.evaluateHandle(`document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.monday entry-creator-week").shadowRoot.querySelector("entry-comp:nth-child(1)")`)); 
        let entry2 = await (await page.evaluateHandle(`document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.wednesday entry-creator-week").shadowRoot.querySelector("entry-comp:nth-child(2)")`)); 
        await page.waitForTimeout(2000); 
        dragAndDrop(entry1, entry2); 
        await page.waitForTimeout(1000); 

    }); 

})