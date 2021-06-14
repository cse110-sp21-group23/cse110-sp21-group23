# 23andMe Architecture

## Backend architecture 

- Our backend stack is composed of NodeJS server using Express and Postgres. The server can be broken into 3 main modules: Routers, Services and Databases. The Routers act as first point of contact and will call the varying Services depending on the usecase. The Services is in charge of the bussiness logic. It will then call functions from the database modules to perform the appropriate crud operations.  
 ![](https://github.com/cse110-sp21-group23/cse110-sp21-group23/blob/main/docs/backend_architecture.png)
 
 ![](https://github.com/cse110-sp21-group23/cse110-sp21-group23/blob/main/docs/journal_schema.png)   
 

## Frontend overview 

- All the pages for our app are in the pages folder, the two main pages are the daily and weekly pages. The util and api folders contain api functions which the frontend devs used to interact with the backend. The components folder holds all the different compmonents for our app.  

- The daily page contains four components, the date-picker, calendar, entry-creator, and entry. The date-picker shows the user which day they're looking at and the calendar allows for easy navigation of the different days. Upon changing dates, whether it be with the arrows on the date-picker or an input into the calendar, a "datechange" event is thrown which is caught by the entry-creator on the page. The entry-creator will fetch bullets from the database accordingly using the getBulletsByDay function in journal.js. The entry component is stored on the page within the entry-creator component. All drag and drop operations, edit, and delete functions are handled by entry.js (the entry component). The creation of bullets is handled by the entry-creator component.  

- The weekly page contains four components: the weekly-picker, entry-creator-week, entry and weekly-kanban. Similar to the daily page, upon changing the week with the weekly-picker, a "datechange" event is thrown which is caught by the the weekly-kanban component. The weekly-kanban holds the eight entry-creator-week's on the page and upon catching the "datechange" event, fetches the 8 different days' bullets which is then rendered by the 8 entry-creator-week's. The entry components themselves are once again stored within the entry-creator-week's and the functionality of the entry-creator-week and weekly-entry is identical to that of the daily page.  

 ### Entry creation (functionality is same on daily and weekly pages) 
 
-  The entry-creator contains a form which on submit, creates an "entry" JSON object using the "createbullet" function which is then sent to the server using the "addBullet" api function and then instantiated on the page using a setter function within entry.js. All bullets are initially stored at the bottom of the current list. We store the order of the bullets according to their id in the database so after creating the bullet, we use "updateSorting" to update the list of id's associated with the current date in the database.  
 
 ### Entries 
 
 #### Drag and drop
 
- Whether it be on the weekly or daily page, all DnD operations are stored in the entry.js and weekly-entry.js files. We used the native JS DnD and made both the weekly-entry and entry components "draggable" elements on the page. The six functions which handle each drag event (handleDragStart, handleDragOver, handleDragEnter, handleDragLeave, handleDrop, and handleDragEnd) are all above the entrys' "render" functions. To quickly overview the drag and drop, upon dragstart, the entry the user is dragging is stored into dragSrcEl. Upon dragEnd, (not including edge cases) the dragged entry is inserted into the list at the index of the entry that it was dropped on. Whether the drag be within the same entry-creator or across different entry creators (days) updateSorting is called to update the order / which list the dragged entry should now be stored in. If it's across entry-creators, "editBullet" must also be called to change the date of the stored entry in the databse. And in the frontend, the dragged component is always deleted and recreated at its new index / list. 

#### Edit and deletions 
- The edit and delete functionality are both within the "render" functions of the entry components. Bpth are handled in the modal within entry.js. Upon double clicking an entry, a modal pops up with buttons and a radio which allows users to change the type of the bullet, the status of the bullet, and to delete the bullet. Deletions require deleting the bullet in the databse using the "deleteBullet" api function, and then using "updateSorting" to store the order of the remaining entries for that day. All edit operations are handled with "editBullet". 
