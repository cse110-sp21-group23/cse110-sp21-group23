// jest-puppeteer.config.js
module.exports = {
  launch: {
    headless: true,
    slowMo: 500,
    defaultViewport: null, 
    args: [
      '--window-size=1584,800'
    ]
  }
}