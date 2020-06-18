const router = require('express').Router()
const cors = require('cors')
module.exports = router

router.use('/users', require('./users'))
router.use('/messages', require('./messages'))
router.use('/room', require('./room'))
router.use(cors())

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
