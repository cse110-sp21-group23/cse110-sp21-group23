// jest-puppeteer.config.js
module.exports = {
  launch: {
    headless: true,
    slowMo: 250,
    defaultViewport: null, 
    args: [
      '--window-size=2000,2000'
    ]
  }
};
