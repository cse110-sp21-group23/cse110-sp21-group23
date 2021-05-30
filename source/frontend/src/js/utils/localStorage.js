export const setToken = token => {
    window.localStorage.setItem('token', token)
}

export const setEmail = email => {
    window.localStorage.setItem('email', email);
    console.log(email);
}
export const getToken = () => window.localStorage.getItem('token')
export const getEmail = () => window.localStorage.getItem('email');
