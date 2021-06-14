# Team 23 - 23andMe

## Bullet Journal by 23andMe
You can access our 23andMe Bullet Journal using [here](https://cse110-23-web.herokuapp.com/)!
![](https://github.com/cse110-sp21-group23/cse110-sp21-group23/blob/main/admin/branding/dailyView.png)

## Project Features
* User signup
* Editable journal
* Drag and drop
* Dynamic weekly view
* Slidable navigation bar

## Final Project Videos
- [Final video - Public version](https://youtu.be/Salzrti5DCI)
- [Final video - Private version](https://youtu.be/F7HqybqDJ2w)

## CI/CD Pipeline Information and Documentation:
All of the CI/CD pipeline can be found in the **/admin** folder\
You can find documentation and implementation information about our CI/CD pipeline [here](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/admin/cipipeline)!\
<br>
Our JsDocs souce is under **/docs** folder.\
The JsDocs information is [here](https://cse110-sp21-group23.github.io/cse110-sp21-group23/)

## Design

The full design documentation of our Bullet Journal Application is under **/specs** folder.

- We have five **architecture decision records (ADRS)**,  [ADRS](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/specs/adrs).

- Here is our [pitch document](https://github.com/cse110-sp21-group23/cse110-sp21-group23/blob/main/specs/pitch/23andMe_Bullet_Journal_Pitch_Deck.pdf). The pitch document contain the topics of risks and rabbit holes as well as a visual representation of what you are doing in the form of system diagrams and wireframes. Our pitch also have a statement of purpose as well as a section on user personas. 

- Our UI designers creates multiple version of the Bullet Journal Application, [check it out here](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/specs/interface)! We also have our coloring and font choices inside the figma, specifically inside the high fidelty prototypes.

## Sprints
#### Once we finished the design part and move on to build our Bullet Journal Application, we start to have sprint section follow the guidance of agile.
- Sprint 1
  - [Retrospective](https://github.com/cse110-sp21-group23/cse110-sp21-group23/blob/main/admin/meetings/051821-retrospective.png)
  - [Review](https://github.com/cse110-sp21-group23/cse110-sp21-group23/blob/main/admin/meetings/051821-sprint-1-review.md)
- Sprint 2
  - [Retrospective](https://github.com/cse110-sp21-group23/cse110-sp21-group23/blob/main/admin/meetings/053021-retrospective.png)
  - [Review](https://github.com/cse110-sp21-group23/cse110-sp21-group23/blob/main/admin/meetings/053021-sprint-2-review.md.pdf)

## Admins
- The signed contract is included [here](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/admin/misc)
- You can see all the meeting notes [here](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/admin/meetings)
- Standup meeting records listed [here](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/admin/standups)
- All the status video and final project video [here](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/admin/videos)
- Our Team 23andMe Kanban board [here](https://github.com/cse110-sp21-group23/cse110-sp21-group23/projects/1)

## Source 
The **[/source](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/source)** folder includes all source code and test code of Bullet Journal Application.\
We separated our code based on the frontend and backend
- **[/frontend](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/source/frontend)** is about the frontend and holds all our different webcomponents 
- **[/server](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/source/server)** is the backend, where our server is held.

## Testing
We utlized the jest and puppeteer framework in order to test our code. We spent a lot of time on both writing and running these tests, which can be found in **[/__tests__](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/source/frontend/__tests__)**

# Contribution
## Cloning the repository
1. Fork the repository.
   - Login to Github, go to the main page of our project, and click the fork button
2. Clone the repository.
   - Go to your forked version of the project, hit the green code button, and copy the HTTPS link given
   - Go to your preferred IDE, and into the terminal type `git clone [INSERT HTTPS LINK HERE]`
   - You will now have your own local copy of our project and you can start working on it!
## Building the App
1. Install the required npm modules
   - In your terminal, type `npm init`. This will install the necessary things to build our app
## Deploy the App
1. Use `npm run dev` to deploy the app
   - In your terminal, navigate to the frontend folder (`cse110-sp21-group23/source/frontend`)
   - Use `npm run dev` in order to deploy the app
   - Once there login using these credientials
       - user: e@gmail.com
       - pass: asd
   - You have now deployed the app!
## Submitting changes
1. Create a new branch
   - Use `git checkout -b <yourNewBranchName>` to create a new branch
   - Make sure to name the branch accordingly based on what it is doing
2. Submit a pull request
   - Once you created and tested your change and you like it, submit a pull request
   - To do that make sure you push your branch and the commit(s) to the repository 
   - Once you successfully do that, find your branch on the repository, go to it, and submit a pull request for it
## Running user tests
1. Install Jest
   - In your terminal, run `npm install --save-dev jest babel-jest @babel/core @babel/preset-env`
   - This will install Jest, which is how we do our unit testing
2. Install Puppeteer
   - In your terminal, run `npm install --save-dev puppeteer jest-puppeteer`
   - This will install Puppeteer, which is how we do our E2E testing
3. Run tests
   - Deploy the app first using `npm run dev`
   - Then open a new instance of your IDE, and navigate to the frontend folder (`cse110-sp21-group23/source/frontend`)
   - Then run in your terminal `npm test ./__tests__/[testname].test.js` with [testname] being the test you want to run
## Documentation
   - Here is our [documentation](https://cse110-sp21-group23.github.io/cse110-sp21-group23/)

## End-user Documentation 
  - Find our end-user article [here](https://github.com/cse110-sp21-group23/cse110-sp21-group23/blob/main/specs/end-user-doc.md)
# 23andMe Backend Architecture

Our backend stack is composed of NodeJS server using Express and Postgres. The server can be broken into 3 main modules: Routers, Services and Databases. The Routers act as first point of contact and will call the varying Services depending on the usecase. The Services is in charge of the bussiness logic. It will then call functions from the database modules to perform the appropriate crud operations.  
 ![](https://github.com/cse110-sp21-group23/cse110-sp21-group23/blob/main/docs/backend_architecture.png)
 
 ![](https://github.com/cse110-sp21-group23/cse110-sp21-group23/blob/main/docs/journal_schema.png)   
 

# 23andMe Code layout Overview 

All the pages for our app are in the pages folder, the two main pages are the daily and weekly pages. The util and api folders contain api functions which the frontend devs used to interact with the backend. The components folder holds all the different compmonents for our app.  

The daily page contains four components, the date-picker, calendar, entry-creator, and entry. The date-picker shows the user which day they're looking at and the calendar allows for easy navigation of the different days. Upon changing dates, whether it be with the arrows on the date-picker or an input into the calendar, a "datechange" event is thrown which is caught by the entry-creator on the page. The entry-creator will fetch bullets from the database accordingly using the getBulletsByDay function in journal.js. The entry component is stored on the page within the entry-creator component. All drag and drop operations, edit, and delete functions are handled by entry.js (the entry component). The creation of bullets is handled by the entry-creator component.  

The weekly page contains four components: the weekly-picker, entry-creator-week, entry and weekly-kanban. Similar to the daily page, upon changing the week with the weekly-picker, a "datechange" event is thrown which is caught by the the weekly-kanban component. The weekly-kanban holds the eight entry-creator-week's on the page and upon catching the "datechange" event, fetches the 8 different days' bullets which is then rendered by the 8 entry-creator-week's. The entry components themselves are once again stored within the entry-creator-week's and the functionality of the entry-creator-week and weekly-entry is identical to that of the daily page.  

 ## Entry creation (functionality is same on daily and weekly pages) 
 
 The entry-creator contains a form which on submit, creates an "entry" JSON object using the "createbullet" function which is then sent to the server using the "addBullet" api function and then instantiated on the page using a setter function within entry.js. All bullets are initially stored at the bottom of the current list. We store the order of the bullets according to their id in the database so after creating the bullet, we use "updateSorting" to update the list of id's associated with the current date in the database.  
 
 ## Entries 
 
Whether it be on the weekly or daily page, all DnD operations are stored in the entry.js and weekly-entry.js files. We used the native JS DnD and made both the weekly-entry and entry components "draggable" elements on the page. The six functions which handle each drag event (handleDragStart, handleDragOver, handleDragEnter, handleDragLeave, handleDrop, and handleDragEnd) are all above the entrys' "render" functions. The edit and delete functionality are both within the "render" functions of the entry components. 
