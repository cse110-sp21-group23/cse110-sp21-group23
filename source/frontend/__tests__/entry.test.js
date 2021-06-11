/**
 * @jest-environment puppeteer
 */
 const baseURL = 'http://127.0.0.1:5000'

 describe('Test bullet', () => {
    beforeAll(async () => {
        await jest.setTimeout(30000)
        await page.goto('http://127.0.0.1:5000/')
        await page.waitForTimeout(500);
    });

    it('Test1: Login and go to July 4, 2019', async () => {
        await page.$eval('#username-input', e => e.value = "e@gmail.com")
        await page.$eval('#password-input', e => e.value = "asd")
        await page.$eval('#signin-button', e => e.click())
        await page.waitForTimeout(1000);
        await page.evaluate(() => {
            let calendar = document.querySelector("daily-page").shadowRoot.querySelector("date-picker").shadowRoot.querySelector("calendar-picker");
            // Month is zero indexxed
            calendar.date = new Date(2019, 6, 4);
        });

        let dateText = await page.evaluate(() => {
            let dP = document.querySelector("daily-page").shadowRoot.querySelector("date-picker").shadowRoot.querySelector("#date-text").innerHTML;
            return dP;
        });

        expect(dateText).toEqual("Jul 4 2019");
        await page.waitForTimeout(1000);
    }, 15000)

    it('Test1.5: Make sure July 4, 2019 is empty', async () => {
        let numEntries = await page.evaluate(() => {
            let entries = document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer").children;
            return entries.length;
        });
        expect(numEntries).toEqual(0)
    });

    
    it('Test2: Adding bullet', async () => {
        //Puts "asdf123" into the entryBox
       await page.evaluate(() => {
            let enterEntry = document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.getElementById("entryBox");
            enterEntry.value = "asdf123";
        });

        //Clicks on the entryBox to submit the new entry
        let entryBox = await (await page.evaluateHandle(`document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.getElementById("entryBox")`)).asElement();
        await entryBox.click();
        await page.keyboard.press('Enter');

        //Gets the new entry's text content
        let soleEntry = await page.evaluate(() => {
            let allEntry= document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer").children;
            let entry = allEntry[0].shadowRoot.querySelector("#content").textContent; 
            return entry;
        });
        expect(soleEntry).toEqual("asdf123");
    });

    it('Test3: Editing bullet', async () => {
        //clicks on the entry made in test2 to open modal
        await page.mouse.click(550, 350,  {clickCount: 2});
        await page.waitForTimeout(500);

        //put "edit bullet" into the modal textBox
        await page.evaluate(() => {
            let modalText = document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("entry-comp").shadowRoot.getElementById("modal-words");
            modalText.value = "Edit Bullet";
        });
        await page.waitForTimeout(500);

        //clicks on the confirm edit button
        let editButton= await (await page.evaluateHandle(`document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("entry-comp").shadowRoot.getElementById("editButton")`)).asElement();
        await editButton.click();
        await page.waitForTimeout(500);

        //Gets the newly edited entry's text content
        let entry = await page.evaluate(() => {
            let soleEntry = document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer").children;
            let text = soleEntry[0].shadowRoot.querySelector("#content").textContent; 
            return text;
        });
        expect(entry).toEqual("Edit Bullet");
    });

    it('Test4: Strikethrough bullet', async () => {
        //clicks on the entry made in test2 to open modal
        await page.waitForTimeout(500);
        await page.mouse.click(550, 350,  {clickCount: 2});

        //click on "Finish bullet"
        let done = await (await page.evaluateHandle(`document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("entry-comp").shadowRoot.getElementById("doneButton")`)).asElement();
        await done.click();

        //Gets the strikethrough edited text html
        let entry = await page.evaluate(() => {
            let soleEntry= document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer").children;
            let text = soleEntry[0].shadowRoot.querySelector("#content").innerHTML; 
            return text;
        });
        expect(entry).toEqual("<strike>Edit Bullet</strike>");
    });

    it('Test5: Un-strikethrough bullet', async () => {
        //clicks on the entry made in test2 to open modal
        await page.waitForTimeout(500);
        await page.mouse.click(550, 350,  {clickCount: 2});

        //click on "Finish bullet"
        let done = await (await page.evaluateHandle(`document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("entry-comp").shadowRoot.getElementById("doneButton")`)).asElement();
        await done.click();

        //Gets the strikethrough edited text html
        let entry = await page.evaluate(() => {
            let soleEntry= document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer").children;
            let text = soleEntry[0].shadowRoot.querySelector("#content").innerHTML; 
            return text;
        });
        expect(entry).toEqual("Edit Bullet");
        await page.waitForTimeout(300);
    });

    it('Test6: Change bullet to event', async () => {

        //clicks on the entry made in test2 to open modal
        await page.mouse.click(550, 350,  {clickCount: 2});
        await page.waitForTimeout(300);

        //clicks on the event radio button in the modal
        let event = await (await page.evaluateHandle(`document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("entry-comp").shadowRoot.getElementById("event")`)).asElement();
        await event.click();
        await page.waitForTimeout(200);

        //click "Confirm edit"
        let edit = await (await page.evaluateHandle(`document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("entry-comp").shadowRoot.getElementById("editButton")`)).asElement();
        await edit.click();
        await page.waitForTimeout(200);

        //get bullet's symbol
        let symbol = await page.evaluate(() => {
            let bulletSymbol = document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("entry-comp").shadowRoot.getElementById("symbol").innerHTML;
            return bulletSymbol;
        });

        expect(symbol).toEqual("🥳");
    });


    it('Test7: Change bullet to note', async () => {

        //clicks on the entry made in test2 to open modal
        await page.mouse.click(550, 350,  {clickCount: 2});
        await page.waitForTimeout(300);

        //clicks on the note radio button in the modal
        let event = await (await page.evaluateHandle(`document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("entry-comp").shadowRoot.getElementById("note")`)).asElement();
        await event.click();
        await page.waitForTimeout(200);

        //click "Confirm edit"
        let edit = await (await page.evaluateHandle(`document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("entry-comp").shadowRoot.getElementById("editButton")`)).asElement();
        await edit.click();
        await page.waitForTimeout(200);

        //get bullet's symbol
        let symbol = await page.evaluate(() => {
            let bulletSymbol = document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("entry-comp").shadowRoot.getElementById("symbol").innerHTML;
            return bulletSymbol;
        });

        expect(symbol).toEqual("📝");
    });

    it('Test8: Change bullet to task', async () => {

        //clicks on the entry made in test2 to open modal
        await page.mouse.click(550, 350,  {clickCount: 2});
        await page.waitForTimeout(300);

        //clicks on the note radio button in the modal
        let event = await (await page.evaluateHandle(`document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("entry-comp").shadowRoot.getElementById("task")`)).asElement();
        await event.click();
        await page.waitForTimeout(200);

        //click "Confirm edit"
        let edit = await (await page.evaluateHandle(`document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("entry-comp").shadowRoot.getElementById("editButton")`)).asElement();
        await edit.click();
        await page.waitForTimeout(200);

        //get bullet's symbol
        let numEntries = await page.evaluate(() => {
            let xd = document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("entry-comp").shadowRoot.getElementById("symbol").innerHTML;
            return xd;
        });
  
        expect(numEntries).toEqual("📌");
    });
    it('Test9: Delete bullet', async () => {
        
        //clicks on the entry made in test2 to open modal
        await page.waitForTimeout(500);
        await page.mouse.click(550, 350,  {clickCount: 2});
        await page.waitForTimeout(500);

        //click on the delete entry button
        let del = await (await page.evaluateHandle(`document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("entry-comp").shadowRoot.getElementById("deleteButton")`)).asElement();
        await del.click();

        //Get the number of things inside entryContainer (number of bullets / entry)
        let numEntries = await page.evaluate(() => {
            let entries = document.querySelector('daily-page').shadowRoot.querySelector("entry-creator").shadowRoot.querySelector("#entryContainer").children;
            return entries.length;
        });
        expect(numEntries).toEqual(0);
        
    });
    
});