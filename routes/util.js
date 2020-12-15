const router = require('express').Router()

// const validateToken = require('../middlewares/validateToken')

const utilController = require('../controllers/util')

// Controllers -----

router.get(
  '/checkUsernameAvailability',
  utilController.checkUsernameAvailability
)

router.get('/checkPhoneAvailability', utilController.checkPhoneAvailability)

router.get('/', (req, res) => {
  res.send('Please read documentation for the API. (util)')
})

// Export -----
module.exports = router
