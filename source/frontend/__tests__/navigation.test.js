const loginURL = 'http://127.0.0.1:5000/';
const dailyURL = 'http://127.0.0.1:5000/daily';

describe('Bottom and Top Navigation test:', () => {
  beforeAll(async () => {
    jest.setTimeout(20000);
    await page.goto(loginURL);
    await page.waitForTimeout(500);
    // Login first
    await page.$eval('#username-input', (e) => (e.value = 'e@gmail.com'));
    await page.$eval('#password-input', (e) => (e.value = 'asd'));

    await page.$eval('#signin-button', (e) => e.click());

    await page.waitForNavigation();
  }, 20000);

  it('Test1: Check landing page is on the Daily Page', async () => {
    const curURL = page.url();
    expect(curURL).toBe('http://127.0.0.1:5000/daily');
  });

  it('Test2: Have access to weekly page', async () => {
    await page.evaluate(() => {
      document.querySelector('navigation-bar').shadowRoot.querySelector('[data-page="weekly').click();
    });

    const curURL = page.url();

    expect(curURL).toBe('http://127.0.0.1:5000/weekly');
  });

  it('Test3: Check if the logo brings user back to home page (daily page)', async () => {
    const dailyB = await (
      await page.evaluateHandle(
        'document.querySelector("top-navbar").shadowRoot.querySelector("h1 > a")'
      )
    ).asElement();

    await dailyB.click();
    await page.waitForTimeout(3000);

    const curURL = page.url();

    expect(curURL).toBe('http://127.0.0.1:5000/daily');
  });

  it('Test2: Have access to weekly page', async () => {
    await page.evaluate(() => {
      document.querySelector('navigation-bar').shadowRoot.querySelector('[data-page="weekly').click();
    });

    const curURL = page.url();

    expect(curURL).toBe('http://127.0.0.1:5000/weekly');
  });

  it('Test3: Have access to daily page', async () => {
    await page.evaluate(() => {
      document.querySelector('navigation-bar').shadowRoot.querySelector('[data-page="daily').click();
    });

    const curURL = page.url();

    expect(curURL).toBe('http://127.0.0.1:5000/daily');
  });

  it('Test4: Check if side navigation bar can hide', async () => {
    const closed = await page.evaluate(() => {
      document.querySelector('navigation-bar').shadowRoot.querySelector('#hide').click();
      return document
        .querySelector('navigation-bar')
        .shadowRoot.querySelector('#hide').innerHTML;
    });

    expect(closed.replace('&gt;', '>')).toBe('>');
  });

  it('Test5: Check if side navigation bar can show', async () => {
    const closed = await page.evaluate(() => {
      document.querySelector('navigation-bar').shadowRoot.querySelector('#hide').click();
      return document
        .querySelector('navigation-bar')
        .shadowRoot.querySelector('#hide').innerHTML;
    });

    expect(closed.replace('&lt;', '<')).toBe('<');
  });

  it('Test6: Check if user can navigate to back page in history', async () => {
    console.log(page.url());

    await page.goBack();

    const curURL = page.url();

    expect(curURL).toBe('http://127.0.0.1:5000/weekly');
  });

  it('Test7: Check if user can navigate forward page in history', async () => {
    await page.goForward();

    const curURL = page.url();

    expect(curURL).toBe('http://127.0.0.1:5000/daily');
  });
});
