'use strict';

var userDB = require('../db/user')
var bcrypt = require('bcryptjs');
var common = require('../utils/common')
var jwt = require('../utils/jwt')

module.exports = {
    
    /**
     * Function which will register a new user, given the correct credentials
     * @param  {string} email
     * @param  {string} password
     * @returns id
     */
    register: async (email, password) => {
        try {
            if (!common.validateEmail(email)) {
                throw 'Invalid email address'
            }
            const user = await userDB.getByEmail(email)
            if (user != null) {
                throw 'The email has already been used'
            }
            const res = await userDB.store(email, bcrypt.hashSync(password, 10))
            return res.id
        } catch (err) {
            throw err
        }   
    },

    /**
     * Function which will login a user, given the appropriate credentials
     * @param  {string} email
     * @param  {string} password
     * @returns Access Token
     */
    login: async (email, password) => {
        try {
            const user = await common.toCamelCase(await userDB.getByEmail(email))
            if (user.email == null) {
                throw {error: "Email not found"}
            }
            if (bcrypt.compareSync(password, user.password)) {
                return jwt.generateAccessToken({
                    id:     user.id,
                    email:  user.email,
                })
            } else {
                throw {error: "Wrong password"}
            }
        } catch (err) {
            throw err
        }
    }
}
