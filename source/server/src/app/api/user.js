"use strict";
var userService = require('../service/user')

const userRouter = require('express').Router();

userRouter.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body
        await userService.register(email, password)
        res.send("success")
    } catch (err) {
        res.status(400).send(err)
    }
});

userRouter.get('/login', async (req, res, next) => {
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