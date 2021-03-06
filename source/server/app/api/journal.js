"use strict";

var jwt = require('../utils/jwt')
var common = require('../utils/common')
const journalRouter = require('express').Router();
var journalService = require('../service/journal');
const journal = require('../db/journal');

journalRouter.post('/', async (req, res, next) => {
    try {
        const { id } = jwt.verifyAndDecode(req.headers.authorization)
        await journalService.createJournal(id, req.body.title)
        common.httpSuccess(res)
    } catch (err) {
        common.htttpError(res, err)
    }
})

journalRouter.get('/', async (req, res, next) => {
    try {  
        const { id } = jwt.verifyAndDecode(req.headers.authorization)
        res.send((await journalService.getJournalByUserId(id)))
    } catch (err) {
        common.htttpError(res, err)
    }
})

journalRouter.post('/bullet', async (req, res, next) => {
    try {
        jwt.verifyAndDecode(req.headers.authorization)
        const data = await journalService.createBullet(req.body)
        res.send(data)
    } catch (err) {
        console.log(err)
        common.htttpError(res, err)
    }
})

journalRouter.put('/bullet/', async (req, res, next) => {
    try {
        jwt.verifyAndDecode(req.headers.authorization)
        console.log("req.params: ", req.params)
        await journalService.updateBullet(req.body)
        common.httpSuccess(res)
    } catch (err) {
        common.htttpError(res, err)
    }
})

journalRouter.delete('/bullet/:id', async (req, res, next) => {
    try {
        jwt.verifyAndDecode(req.headers.authorization)
        if (req.params.id == null) {
            throw {
                error: "missing id"
            }
        }
        await journalService.deleteBullet(parseInt(req.params.id))
        common.httpSuccess(res)
    } catch (err) {
        common.htttpError(res, err)
    }
})


journalRouter.patch('/:id/day/:date', async (req, res) => {
    try {
        const { id, date } = req.params
        if (id == null || date == null) {
            throw {
                error: "missing id or or date"
            }
        }
        await journalService.updateSorting(id, date, req.body.array)
        common.httpSuccess(res)
    } catch (err) {
        common.htttpError(res, err)
    }
})

journalRouter.get('/:id/bullet/:interval/:start', async (req, res, next) => {
    try {
        const { id, interval, start } = req.params
        if (id == null || interval == null || start == null) {
            throw {
                error: "missing id or or interval or start"
            }
        }
        jwt.verifyAndDecode(req.headers.authorization)
        if (req.params.interval == "day") {
            let bullets = await journalService.getBulletByDay(parseInt(id), start)
            res.send(bullets)
        }
    } catch (err) {
        common.htttpError(res, err)
    }
})

module.exports = journalRouter;