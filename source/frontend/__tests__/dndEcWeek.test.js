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

    it('Test1: Login', async () => {
        //Login 
        await page.$eval('#username-input', e => e.value = "f@gmail.com")
        await page.$eval('#password-input', e => e.value = "123")
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

    it ('Test3: Create elemtn on first day and drag from first day to first element on third day', async()=> { 
        await page.evaluate(() => { 
            let textBox = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.monday entry-creator-week").shadowRoot.querySelector("#entryBox"); 
            textBox.value = "example entry"; 
        }); 
        let day3Listbefore = await page.evaluate(()=> { 
            let numChildren = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.wednesday entry-creator-week").shadowRoot.querySelector("#entryContainer").children.length; 
            return numChildren;
        })
        //click on the add button 
        let textB = await (await page.evaluateHandle(`document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.monday entry-creator-week").shadowRoot.querySelector("#entryBox")`)); 
        await textB.click();  
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1000); 
        

        //Grab first entry content in first day
        let entry1Body = await page.evaluate(() =>{ 
            let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.monday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)").shadowRoot.querySelector("#content").innerHTML; 
            return content; 
        }); 
        //Grab first entry content in third day
        let entry2Body = await page.evaluate(()=> { 
            let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.wednesday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)").shadowRoot.querySelector("#content").innerHTML; 
            return content; 
        });

        //Grab entries to DnD
        let entry1 = await (await page.evaluateHandle(`document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.monday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)")`)); 
        let entry2 = await (await page.evaluateHandle(`document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.wednesday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)")`)); 
        await page.waitForTimeout(2000); 

        //DnD
        dragAndDrop(entry1, entry2); 
        await page.waitForTimeout(1000); 

        //Check everything's alright 
        let entry1BodyAfter; 
        if (day3Listbefore == 1 && entry2Body != ""){
            entry1BodyAfter = await page.evaluate(() => { 
                let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.wednesday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(2)").shadowRoot.querySelector("#content").innerHTML;
                return content; 
            }); 
        }
        else { 
            entry1BodyAfter = await page.evaluate(() => { 
                let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.wednesday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)").shadowRoot.querySelector("#content").innerHTML;
                return content; 
            });
        }
        console.log("The third day's first: " + entry2Body); 
        //Should only run test if entry2 was not the empty entry 
        if (entry2Body != ""){ 
            let entry2BodyAfter; 
            if (day3Listbefore == 1){
                entry2BodyAfter = await page.evaluate(()=> { 
                    let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.wednesday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)").shadowRoot.querySelector("#content").innerHTML;
                    return content; 
                }); 
            }
            else { 
                entry2BodyAfter = await page.evaluate(()=> { 
                    let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.wednesday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(2)").shadowRoot.querySelector("#content").innerHTML;
                    return content; 
                }); 
            }
            expect(entry2Body).toBe(entry2BodyAfter); 
        }

        await page.waitForTimeout(1000);
        expect(entry1Body).toBe(entry1BodyAfter); 
    }, 17000); 

    it ('Test4: Move the first entry from 3rd day back into the first day', async ()=> { 
        let day1Listbefore = await page.evaluate(()=> { 
            let numChildren = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.monday entry-creator-week").shadowRoot.querySelector("#entryContainer").children.length; 
            return numChildren;
        })
        //Grab first entry content in third day
        let entry1Body = await page.evaluate(()=> { 
            let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.wednesday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)").shadowRoot.querySelector("#content").innerHTML; 
            return content; 
        });

        let entry2Body = await page.evaluate(()=> { 
            let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.monday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)").shadowRoot.querySelector("#content").innerHTML; 
            return content; 
        })

         //Grab entries to DnD
         let entry1 = await (await page.evaluateHandle(`document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.wednesday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)")`));
         //The empty entry
         let entry2 = await (await page.evaluateHandle(`document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.monday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)")`)); 
         await page.waitForTimeout(2000); 

         //DnD
         dragAndDrop(entry1, entry2); 
         await page.waitForTimeout(1000); 

        let entry1BodyAfter; 
        //Check entry 1 is in the first day 
        //Normal cases where there isn't one entry in dragged on list
        if (day1Listbefore == 1 && entry2Body != ""){
            entry1BodyAfter = await page.evaluate(() => { 
                let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.monday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(2)").shadowRoot.querySelector("#content").innerHTML;
                return content; 
            }); 
        }
        //Edge case of one entry in dragged list
        else { 
            entry1BodyAfter = await page.evaluate(() => { 
                let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.monday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)").shadowRoot.querySelector("#content").innerHTML;
                return content; 
            });
        }
        await page.waitForTimeout(1000); 
        expect(entry1Body).toBe(entry1BodyAfter); 

        //Check list length of day 1 has one added to it
        let day1List = await page.evaluate(()=> { 
            let numChildren = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.monday entry-creator-week").shadowRoot.querySelector("#entryContainer").children.length; 
            return numChildren;
        }); 

        //Means list was empty 
        if (entry2Body == ""){ 
            day1Listbefore = 1; 
        }
        else { 
            day1Listbefore += 1; 
        }
        await page.waitForTimeout(1000); 
        expect(day1List).toEqual(day1Listbefore); 
    }, 10000); 

    it ('Test5: Create and move the first entry in the fifth day to the first entry on the second day (across divs)', async ()=> { 
        await page.evaluate(() => { 
            let textBox = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(2) > div.day.friday entry-creator-week").shadowRoot.querySelector("#entryBox"); 
            textBox.value = "example entry"; 
        }); 
        //click on the add button 
        let textB = await (await page.evaluateHandle(`document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(2) > div.day.friday entry-creator-week").shadowRoot.querySelector("#entryBox")`)); 
        await textB.click();  
        await page.keyboard.press('Enter');
        await page.waitForTimeout(1000); 

        //Grab first entry content in fifth day
        let entry1Body = await page.evaluate(() =>{ 
            let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(2) > div.day.friday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)").shadowRoot.querySelector("#content").innerHTML; 
            return content; 
        }); 
        let entry2Body = await page.evaluate(() => { 
            let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.tuesday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)").shadowRoot.querySelector("#content").innerHTML;
            return content; 
        });

        //Size of day lists initially 
        let day2Listbefore = await page.evaluate(()=> { 
            let numChildren = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.monday entry-creator-week").shadowRoot.querySelector("#entryContainer").children.length; 
            return numChildren;
        });
        let day5Listbefore = await page.evaluate(()=> { 
            let numChildren = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(2) > div.day.friday entry-creator-week").shadowRoot.querySelector("#entryContainer").children.length; 
            return numChildren;
        });

        //Grab the handles to do the dragging
        let entry1 = await (await page.evaluateHandle(`document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(2) > div.day.friday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)")`));
        //The empty entry
        let entry2 = await (await page.evaluateHandle(`document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.tuesday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)")`)); 
        await page.waitForTimeout(2000); 

        dragAndDrop(entry1, entry2); 
        await page.waitForTimeout(2000); 

        //Check entry at day 2 index 1 
        let entry1BodyAfter
        //Normal cases where there isn't one entry in dragged on list
        if (day2Listbefore == 1 && entry2Body != ""){
            entry1BodyAfter = await page.evaluate(() => { 
                let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.tuesday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(2)").shadowRoot.querySelector("#content").innerHTML;
                return content; 
            });
        }
        //Edge case of one entry in dragged list
        else {
            entry1BodyAfter = await page.evaluate(() => { 
                let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.tuesday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)").shadowRoot.querySelector("#content").innerHTML;
                return content; 
            });  
        }
        expect(entry1Body).toBe(entry1BodyAfter); 

        //Check list length of day 5 is 1 less
        let day5List = await page.evaluate(() => { 
            let numChildren = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(2) > div.day.friday entry-creator-week").shadowRoot.querySelector("#entryContainer").children.length; 
            return numChildren; 
        }); 
        await page.waitForTimeout(1000); 
        //Means list is empty 
        if (day5Listbefore == 1){ 
            day5Listbefore = 1; 
        }
        else { 
            day5Listbefore -= 1; 
        }
        expect(day5List).toBe(day5Listbefore); 

    }, 15000); 

    it ('Test6: Move the entry in the second day back to first index of fifth', async () => {
        //Grab first entry content in the second day 
        let entry1Body = await page.evaluate(() =>{ 
            let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.tuesday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)").shadowRoot.querySelector("#content").innerHTML; 
            return content; 
        }); 
        //Grab first entry content in fifth day 
        let entry2Body = await page.evaluate(()=> { 
            let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(2) > div.day.friday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)").shadowRoot.querySelector("#content").innerHTML; 
            return content; 
        });
        //Size of day 5 list initially 
        let day5Listbefore = await page.evaluate(()=> { 
            let numChildren = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(2) > div.day.friday entry-creator-week").shadowRoot.querySelector("#entryContainer").children.length; 
            return numChildren;
        });

        //Grab handles so that we can do drag and drop 
        let entry1 = await (await page.evaluateHandle(`document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(1) > div.day.tuesday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)")`));
        let entry2 = await (await page.evaluateHandle(`document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(2) > div.day.friday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)")`)); 
        await page.waitForTimeout(2000);
        //DnD
        dragAndDrop(entry1, entry2); 

        await page.waitForTimeout(2000); 
        
        let entry1BodyAfter; 
        //Normal cases where there isn't one entry in dragged on list
        if (day5Listbefore == 1 && entry2Body != ""){ 
            entry1BodyAfter = await page.evaluate(() => { 
                let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(2) > div.day.friday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(2)").shadowRoot.querySelector("#content").innerHTML;
                return content; 
            }); 
        }
        //Edge case of one entry in dragged list
        else { 
            entry1BodyAfter = await page.evaluate(() => { 
                let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(2) > div.day.friday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(1)").shadowRoot.querySelector("#content").innerHTML;
                return content; 
            }); 
        }

        //Only run test if the entry in the fifth day wasn't empty 
        if (entry2Body != ""){
            let entry2BodyAfter = await page.evaluate(()=> { 
                let content = document.querySelector("weekly-page").shadowRoot.querySelector("weekly-kanban").shadowRoot.querySelector(".column-container > div:nth-child(2) > div.day.friday entry-creator-week").shadowRoot.querySelector("weekly-entry-comp:nth-child(2)").shadowRoot.querySelector("#content").innerHTML;
                return content; 
            }); 
            expect(entry2Body).toBe(entry2BodyAfter); 
        }

        await page.waitForTimeout(1000);
        expect(entry1Body).toBe(entry1BodyAfter); 
    }, 15000);
})