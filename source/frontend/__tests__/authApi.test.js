import { login, register } from './src/js/api/user'

test('Test valid login', async () => {
    const res = await login('e@gmail.com', 'asd')
    expect(res.token).not.toBe(null);
});

test('Test login with unregistered email', async () => {
    try {
        await login('doesnt-exist@gmail.com', 'nope')
    } catch (err) {
        expect(err).toBe("Email not found")
    }
})

test('Test login with wrong password', async () => {
    try {
        await login('e@gmail.com', 'nope')
    } catch (err) {
        expect(err).toBe("Wrong password")
    }
})

test('Test register with used email', async () => {
    try {
        await register('e@gmail.com', 'nope')
    } catch (err) {
        expect(err).toBe("Wrong password")
    }
})