"use strict";
var userService = require('../service/user')
var journalService = require('../service/journal')
const userRouter = require('express').Router();

userRouter.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body
        const userId = await userService.register(email, password)
        await journalService.createJournal(userId, 'My First Journal')
        res.send("success")
    } catch (err) {
        res.status(400).send(err)
    }
});

userRouter.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body
        const token = await userService.login(email, password)
        res.send({
            token
        })
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = userRouter;