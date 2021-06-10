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

describe('E2E Testing for dragging within same list', () => {
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
        await page.evaluate(() => {
            let calendar = document.querySelector("daily-page").shadowRoot.querySelector("date-picker").shadowRoot.querySelector("calendar-picker");
            // Month is zero indexxed
            calendar.date = new Date(1950, 6, 7);
        });

        let dateText = await page.evaluate(() => {
            let dP = document.querySelector("daily-page").shadowRoot.querySelector("date-picker").shadowRoot.querySelector("#date-text").innerHTML;
            return dP;
        });

        expect(dateText).toEqual("Jul 7 1950");
        await page.waitForTimeout(1000);
    }, 15000)

    it('Test2: Ensure there are five entries on the page', async () => {
        let numEntries = await page.evaluate(() => {
            let entries = document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer").children;
            return entries.length;
        });
        expect(numEntries).toEqual(5);
    });

    it('Test3: Drag entry at second index to fourth index', async () => {
        //Grab content in the entries 
        let entry2Body = await page.evaluate(() => { 
            let content = document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer entry-comp:nth-child(2)").shadowRoot.querySelector("#content").innerHTML; 
            return content;
        }); 

        let entry2 = await (await page.evaluateHandle(`document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer entry-comp:nth-child(2)")`));
        let entry4 = await (await page.evaluateHandle(`document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer entry-comp:nth-child(4)")`));
        await page.waitForTimeout(2000);
        dragAndDrop(entry2, entry4); 
        await page.waitForTimeout(1000);

        //DnD should place second index entry to index on top of fourth. So third index
        let entry2BodyAfter = await page.evaluate(() => { 
            let content = document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer entry-comp:nth-child(3)").shadowRoot.querySelector("#content").innerHTML; 
            return content; 
        })

        expect(entry2Body).toBe(entry2BodyAfter);
    }, 50000);

    it('Test4: Drag entry at last index to first index', async ()=> { 
        //GRab content in the entries 
        let entry1Body = await page.evaluate(() => { 
            let content = document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer entry-comp:nth-child(1)").shadowRoot.querySelector("#content").innerHTML; 
            return content;
        }); 
        let entry5Body = await page.evaluate(() => { 
            let content = document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer entry-comp:nth-child(5)").shadowRoot.querySelector("#content").innerHTML; 
            return content;
        }); 

        //DnD
        let entry1 = await (await page.evaluateHandle(`document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer entry-comp:nth-child(1)")`));
        let entry5 = await (await page.evaluateHandle(`document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer entry-comp:nth-child(5)")`));
        await page.waitForTimeout(2000);
        dragAndDrop(entry5, entry1); 
        await page.waitForTimeout(1000);

        //DnD should place last index entry to first index. And first index to second 
        let entry1BodyAfter = await page.evaluate(() => { 
            let content = document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer entry-comp:nth-child(2)").shadowRoot.querySelector("#content").innerHTML; 
            return content; 
        }); 

        let entry5BodyAfter = await page.evaluate(() => { 
            let content = document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer entry-comp:nth-child(1)").shadowRoot.querySelector("#content").innerHTML; 
            return content;
        }); 
        expect(entry5BodyAfter + entry1BodyAfter).toBe(entry5Body + entry1Body); 
    }, 50000); 

    it ('Test5: Edge case of dragging first element to last element', async()=> { 
        //Grab content in the entries 
        let entry1Body = await page.evaluate(() => { 
            let content = document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer entry-comp:nth-child(1)").shadowRoot.querySelector("#content").innerHTML; 
            return content;
        }); 
        let entry5Body = await page.evaluate(() => { 
            let content = document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer entry-comp:nth-child(5)").shadowRoot.querySelector("#content").innerHTML; 
            return content;
        }); 

        //DnD
        let entry1 = await (await page.evaluateHandle(`document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer entry-comp:nth-child(1)")`));
        let entry5 = await (await page.evaluateHandle(`document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer entry-comp:nth-child(5)")`));
        await page.waitForTimeout(2000);
        dragAndDrop(entry1, entry5); 
        await page.waitForTimeout(1000);

        //Should place entry1 to last index and last index to fourth index
        let entry1BodyAfter = await page.evaluate(() => { 
            let content = document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer entry-comp:nth-child(5)").shadowRoot.querySelector("#content").innerHTML; 
            return content; 
        }); 

        let entry5BodyAfter = await page.evaluate(() => { 
            let content = document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer entry-comp:nth-child(4)").shadowRoot.querySelector("#content").innerHTML; 
            return content;
        }); 
        expect(entry5BodyAfter + entry1BodyAfter).toBe(entry5Body + entry1Body); 
    }, 50000); 

    it("Test 6: Move to the day before and move back to July7 to see if entry order is the same", async ()=>{ 
        //Get current entry order 
        let entryOrder = await page.evaluate(() => { 
            let idArray =[]; 
            let entries = document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer").children; 
            for (let i =0; i < entries.length ; i++){ 
                idArray.push(entries[i].id); 
            }
            return idArray; 
        }); 

        //Move to date before 
        await page.evaluate(() => {
            let calendar = document.querySelector("daily-page").shadowRoot.querySelector("date-picker").shadowRoot.querySelector("calendar-picker");
            // Month is zero indexxed
            calendar.date = new Date(1950, 6, 6);
        });

        let dateText = await page.evaluate(() => {
            let dP = document.querySelector("daily-page").shadowRoot.querySelector("date-picker").shadowRoot.querySelector("#date-text").innerHTML;
            return dP;
        });

        //Ensure it's a day before 
        if (dateText != "Jul 6 1950"){ 
            throw new Error("Wrong date"); 
        }

        //Move back to original day
        await page.evaluate(() => {
            let calendar = document.querySelector("daily-page").shadowRoot.querySelector("date-picker").shadowRoot.querySelector("calendar-picker");
            // Month is zero indexxed
            calendar.date = new Date(1950, 6, 7);
        });

        let dateText2 = await page.evaluate(() => {
            let dP = document.querySelector("daily-page").shadowRoot.querySelector("date-picker").shadowRoot.querySelector("#date-text").innerHTML;
            return dP;
        });
        //Ensure it's the original day 
        if (dateText2 != "Jul 7 1950"){ 
            throw new Error("Wrong date"); 
        }

        //Obtain idArray again 
        let entryOrderAfter = await page.evaluate(() => { 
            let idArray =[]; 
            let entries = document.querySelector("daily-page").shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer").children; 
            for (let i =0; i < entries.length ; i++){ 
                idArray.push(entries[i].id); 
            }
            return idArray; 
        }); 

        expect(entryOrder).toEqual(entryOrderAfter);
    }); 
});

