const baseURL = 'http://0.0.0.0:2014'

describe('Authentication flow', () => {
    beforeAll(async () => {
        await page.goto(baseURL);
        await page.waitForTimeout(500);
        jest.setTimeout(30000)
    });

    it('Test1: Initial Login Page - check if form exists', async () => {
        const loginPage = await page.$$('login-page')
        expect(loginPage).not.toBe(null)
    })

    it('Test2: Login - check if page changes after failed login', async () => {
        await page.$eval('#username-input', e => e.value = "e@gmail.com")
        await page.$eval('#password-input', e => e.value = "wrong password")
        await page.$eval('#signin-button', e => e.click())
        await page.waitForTimeout(500);

        expect(page.url()).toBe(`${baseURL}/`)
    })

    it('Test3: Redirect - check if page redirects to login if URL has changed without token', async () => {
        await page.goto(`${baseURL}/daily`);
        await page.waitForTimeout(500);

        expect(page.url()).toBe(`${baseURL}/`)
    })

    it('Test4: Login - check if page changes after successful login', async () => {
        await page.$eval('#username-input', e => e.value = "e@gmail.com")
        await page.$eval('#password-input', e => e.value = "asd")
        await page.$eval('#signin-button', e => e.click())
        await page.waitForTimeout(500);

        expect(page.url()).toMatch(/\/daily/)
    })
})

