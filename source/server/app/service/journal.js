'use strict';

var _ = require('lodash');

var journalDB = require('../db/journal')
var jwt = require('../utils/jwt')
var common = require('../utils/common')

module.exports = {
    
    /**
     * Function which will create a journal for a user (specified by userId) titled by parameter title
     * @param  {int} userId
     * @param  {string} title
     * @returns A string representing a successful journal creation
     */
    createJournal: async (userId, title) => {
        try {
            let { id: journalId } = await journalDB.storeJournal(title)
            await journalDB.setUserJournal(userId, journalId)
            return 'Success'
        } catch (err) {
            throw err
        }
    },
    
    
    /**
     * Function which will return a journal from a user specified by userId
     * @param  {int} id
     * @returns A journal from a user specified by userId
     */
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

    
    /**
     * Function which will get the bullets written in the span of a day
     * @param  {int} journalId
     * @param  {Date} date
     * @returns The bullets written in the span of a day
     */
    getBulletByDay: async (journalId, date) => {
        try {
            const start = new Date(date)
            const end = new Date(start.getTime() + 24 * 60 * 60 * 1000)
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
    
    /**
     * Function which will edit a bullet 
     * @param  {Object} bullet
     * @returns A string representing a successful update
     */
    updateBullet: async bullet => {
        try {
            await journalDB.update(cleanBulletDate(bullet))
            return 'Success'
        } catch (err) {
            throw err
        }
    },
    
    /**
     * Function which will delete a bullet (specified by id)
     * @param  {int} id
     */
    deleteBullet: async id => {
        try {
            await journalDB.deleteBullet(id)
        } catch (err) {
            throw err
        }
    },

    
    /**
     * Function which will edit the sorting of the bullet points made in a particuar day
     * @param  {int} journalId
     * @param  {Date} date
     * @param  {Array} arr
     */
    updateSorting: async (journalId, date, arr) => {
        try {
            const start = new Date(date)
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
    //newDate.setDate(newDate.getDate() + 1)
    return {
        ...bullet,
        date: newDate
    }
}
