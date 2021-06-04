/**
 * Function which will set the passed in token into local storage
 * @param  {string} token 
 */
export const setToken = token => {
    window.localStorage.setItem('token', token)
}

/**
 * Function which will set the passed in email into local storage
 * @param  {string} email
 */
export const setEmail = email => {
    window.localStorage.setItem('email', email);
    console.log(email);
}

/**
 * Function which will set the passed in journal id into local storage
 * @param  {int} id
 */
export const setJournal = id => {
    window.localStorage.setItem('journal', id)
}

/**
 * Function which will set the passed in date into local storage
 * @param  {Date} date
 */
export const setDate = date => { 
    window.localStorage.setItem('date', date); 
}

/**
 * Function which will return the current token that is in local storage
 * @returns The current token that is in local storage
 */
export const getToken = () => window.localStorage.getItem('token')

/**
 * Function which will return the current email that is in local storage
 * @returns The current email that is in local storage
 */
export const getEmail = () => window.localStorage.getItem('email');

/**
 * Function which will return the current journal id that is in local storage
 * @returns The current journal id that is in local storage
 */
export const getJournal = () => window.localStorage.getItem('journal')

/**
 * Function which will return the current date that is in local storage
 * @returns The current date that is in local storage
 */
export const getDate = () => window.localStorage.getItem('date'); 

