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

router.post('/', async(req, res, next) => {
    try {
        const restaurant = await Restaurant.create({
            name: req.body.name,
            yelpId: req.body.yelpId,
            sponsored: req.body.sponsored,
            sponsorshipExpiration: req.body.sponsorshipExpiration
        })
        res.send(restaurant)
    } catch (err) {
        next(err)
    }
})
