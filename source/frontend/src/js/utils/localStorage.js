export const setToken = token => {
    window.localStorage.setItem('token', token)
}

export const setJournal = id => {
    console.log("fuck"); 
    window.localStorage.setItem('journal', id)
}

export const getToken = () => window.localStorage.getItem('token')
export const getJournal = () => window.localStorage.getItem('journal')

