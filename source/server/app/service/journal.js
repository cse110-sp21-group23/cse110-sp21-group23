'use strict';

var _ = require('lodash');

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
            return await journalDB.store(newBullet)
        } catch (err) {
            throw err
        }
    },
    
    // getBulletByDay: async (journalId, date) => {
    //     try {
    //         const start = new Date(new Date(date).toDateString())
    //         start.setDate(start.getDate() + 1)
    //         const end = new Date(start.getTime() + 24 * 60 * 60 * 1000)
    //         end.setDate(end.getDate() + 1)
    //         const bullets = common.toCamelCase((await journalDB.getByInterval(journalId, start, end)))
    //         bullets.sort((a, b) => (a.priority > b.priority) ? 1 : -1)
    //         return bullets
    //     } catch (err) {
    //         throw err
    //     }
    // },

    getBulletByDay: async (journalId, date) => {
        try {
            const start = new Date(new Date(date).toDateString())
            start.setDate(start.getDate() + 1)
            const end = new Date(start.getTime() + 24 * 60 * 60 * 1000)
            end.setDate(end.getDate() + 1)
            const day = await journalDB.getDayByInterval(journalId, start, end)
            if (day.length == 0) {
                return []
            }
            const bullets = common.toCamelCase((await journalDB.getByInterval(journalId, start, end)))

            if (bullets.length == 0) {
                return []
            }
            return _.sortBy(bullets, function(item) {
                return day[0].bullets.indexOf(item.id)
            }) 
        } catch (err) {
            console.log(err)
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
            await journalDB.deleteBullet(id)
        } catch (err) {
            throw err
        }
    },

    updateSorting: async (journalId, date, arr) => {
        try {
            const start = new Date(new Date(date).toDateString())
            start.setDate(start.getDate() + 1)
            const end = new Date(start.getTime() + 24 * 60 * 60 * 1000)
            const days = await journalDB.getDayByInterval(journalId, start, end)
            let dayId
            if (days.length == 0) {
                dayId = await journalDB.storeDay(journalId, start)
            } else {
                dayId = days[0].id  
            }
            await journalDB.updateSorting(dayId, arr)
        } catch (err) {
            console.log(err)
            throw err
        }
    } 

}

const cleanBulletDate = bullet => {
    const newDate = new Date(bullet.date);
    return {
        ...bullet,
        date: newDate
    }
}
