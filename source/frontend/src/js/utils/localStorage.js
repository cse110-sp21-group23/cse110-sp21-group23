export const setToken = token => {
    window.localStorage.setItem('token', token)
}

export const setEmail = email => {
    window.localStorage.setItem('email', email);
    console.log(email);
}

export const setJournal = id => {
    window.localStorage.setItem('journal', id)
}

export const setDate = date => { 
    window.localStorage.setItem('date', date); 
}

export const getToken = () => window.localStorage.getItem('token')
export const getEmail = () => window.localStorage.getItem('email');
export const getJournal = () => window.localStorage.getItem('journal')
export const getDate = () => window.localStorage.getItem('date'); 

