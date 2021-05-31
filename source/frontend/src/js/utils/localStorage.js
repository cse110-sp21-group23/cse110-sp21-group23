export const setToken = token => {
    window.localStorage.setItem('token', token)
}

export const setJournal = id => {
    window.localStorage.setItem('journal', id)
}

export const setDate = date => { 
    window.localStorage.setItem('date', date); 
}

export const getToken = () => window.localStorage.getItem('token')
export const getJournal = () => window.localStorage.getItem('journal')
export const getDate = () => window.localStorage.getItem('date'); 

