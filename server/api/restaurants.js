const router = require('express').Router()
const {Restaurant} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const restaurants = await Restaurant.findAll({
            where: {sponsored: true}
        })
        res.json(restaurants)
    } catch (ex) {
        next(ex)
    }
})
