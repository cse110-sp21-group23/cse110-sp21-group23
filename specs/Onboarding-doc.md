# Onboarding
This article explains how to get started with working on and contributing to this project!
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
   - After that, find your branch on the repository, go to it, and submit a pull request from your branch to our repository
   - After review, we may implement your changes!
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
