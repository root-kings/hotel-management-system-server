const router = require('express').Router()

const validateToken = require('../middlewares/validateToken')
const allowAdmin = require('../middlewares/allowAdmin')

const hotelController = require('../controllers/hotel')

// Controllers -----

router.get('/:hotelid', validateToken, hotelController.details_get)

router.get('/', validateToken, allowAdmin, hotelController.list_get)

router.post('/', validateToken, allowAdmin, hotelController.create_post)

router.delete(
  '/:hotelid',
  validateToken,
  allowAdmin,
  hotelController.delete_delete
)

router.put('/:hotelid/rooms', validateToken, hotelController.rooms_update_put)

router.put('/:hotelid/bookings', validateToken, hotelController.bookings_put)

router.get(
  '/:hotelid/statistics',
  /* validateToken, */ 
  hotelController.stats_get
)

router.put('/:hotelid', validateToken, allowAdmin, hotelController.update_put)

router.post(
  '/:hotelid/users',
  validateToken,
  allowAdmin,
  hotelController.user_create_post
)

router.get('/', (req, res) => {
  res.send('Please read documentation for the API. (hotel)')
})

// Export -----
module.exports = router
