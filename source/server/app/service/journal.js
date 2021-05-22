'use strict';

var journalDB = require('../db/journal')
var jwt = require('../utils/jwt')
var common = require('../utils/common')

module.exports = {
    createJournal: async (userId, title) => {
        try {
            let { id: journalId } = await journalDB.storeJournal(title)
            await journalDB.setUserJournal(userId, journalId)
            return 'Success'
        } catch (err) {
            throw err
        }
    },
    
    getJournalByUserId: async (id) => {
        try {
            return common.toCamelCase(await journalDB.getJournalByUserId(id))
        } catch (err) {
            throw err
        }
    },
    
    createBullet: async (bullet) => {
        try {
            const newBullet = cleanBulletDate(bullet)
            await journalDB.store(newBullet)
            return 'Success'
        } catch (err) {
            throw err
        }
    },
    
    getBulletByDay: async (journalId, date) => {
        try {
            const start = new Date(new Date(date).toDateString())
            const end = new Date(start.getTime() + 24 * 60 * 60 * 1000)
            const bullets = common.toCamelCase((await journalDB.getByInterval(journalId, start, end)))
            bullets.sort((a, b) => (a.priority > b.priority) ? 1 : -1)
            return bullets
        } catch (err) {
            throw err
        }
    },
    
    updateBullet: async bullet => {
        try {
            await journalDB.update(cleanBulletDate(bullet))
            return 'Success'
        } catch (err) {
            throw err
        }
    },
    
    deleteBullet: async id => {
        try {
            await journalDB.delete(id)
        } catch (err) {
            throw err
        }
    },

}

const cleanBulletDate = bullet => {
    
    return {
        ...bullet,
        date: new Date(new Date(bullet.date).toDateString())
    }
}
