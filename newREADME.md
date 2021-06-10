# Team 23 - 23andMe

## Bullet Journal by 23andMe
You can access our 23andMe Bullet Journal using this [TODO].

## Project Features
* User signup
* Editable journal
* Drag and drop
* Dynamic weekly view
* Slidable navigation bar

## Final Project Videos
- [TODO]

## CI/CD Pipeline Information and Documentation:
All of the CI/CD pipeline can be found in the **/admin** folder\
You can find documentation and implementation information about our CI/CD pipeline [here](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/admin/cipipeline)!\
<br>
Our JsDocs souce is under **/docs** folder.\
The JsDocs information is [here](https://cse110-sp21-group23.github.io/cse110-sp21-group23/)

## Design

The full design documentation of our Bullet Journal Application is under **/specs** folder.

- We have five **architecture decision records (adr)**,  [ADRS](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/specs/adrs).

- Here is our [pitch document](https://github.com/cse110-sp21-group23/cse110-sp21-group23/blob/main/specs/pitch/23andMe_Bullet_Journal_Pitch_Deck.pdf). The pitch document contain the topics of risks and rabbit holes as well as a visual representation of what you are doing in the form of system diagrams and wireframes. Our pitch also have a statement of purpose as well as a section on user personas. 

- Our UI designers creates multiple version of the Bullet Journal Application, [check it out here](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/specs/interface)! We also have our coloring and font choices inside the figma, specifically inside the high fidelty prototypes.

## Sprints
#### Once we finished the design part and move on to build our Bullet Journal Application, we start to have sprint section follow the guidance of agile.
- Sprint 1
  - [Retrospective](https://github.com/cse110-sp21-group23/cse110-sp21-group23/blob/main/admin/meetings/051821-retrospective.png)
  - [Review](https://github.com/cse110-sp21-group23/cse110-sp21-group23/blob/main/admin/meetings/051821-sprint-1-review.md)
- Sprint 2
  - [Retrospective](https://github.com/cse110-sp21-group23/cse110-sp21-group23/blob/main/admin/meetings/053021-retrospective.png)
  - [Review]

## Admins
- The signed contract is included [here](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/admin/misc)
- You can see all the meeting notes [here](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/admin/meetings)
- Standup meeting records listed [here](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/admin/standups)
- All the status video and final project video [here](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/admin/videos)
- Our Team 23andMe Kanban board [here](https://github.com/cse110-sp21-group23/cse110-sp21-group23/projects/1)

## Source 
[\source](https://github.com/cse110-sp21-group23/cse110-sp21-group23/tree/main/source) folder includes all source code and test code of Bullet Journal Application.\
We separate the code in three part, css code in \css folder, java script code in \js folder, and the index.html is in the root of \source.

## Testing
We mainly focus on the unit tests, and have some cypress test for the part that we cannot use unit test to test. We spent a lot of time on how to run both unit test and cypress test together and have an integrated test coverage, but it does not allow us to do it, so we have separated test coverages.
- Unit test (Jest)
  - We did most of testing on unit test, except the start/stop button. Below is the coverage of the unit test.\
   [TODO]()

- Puppeteer
  - We did small tests for E2E with Puppeteer 
  [TODO]()

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
   - In your terminal, type `npm init -y`. This will install the necessary things to build our app
## Deploy the App
1. Use `npm run dev` to deploy the app
   - In your terminal, navigate to the frontend folder (`cse110-sp21-group23/source/frontend`)
   - Use `npm run dev` in order to deploy the app
   - Once there login using these credientials
       - user: e@gmail.com
       - pass: asd
   - You have now deployed the app!
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
