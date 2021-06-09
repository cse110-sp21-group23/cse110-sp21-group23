// jest-puppeteer.config.js
module.exports = {
  launch: {
    headless: false,
    slowMo: 500, 
    defaultViewport: null, 
    args: [
      "--window-size=1584,800",
    ]
  }
}