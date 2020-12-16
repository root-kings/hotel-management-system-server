const router = require('express').Router()

const validateToken = require('../middlewares/validateToken')
const allowAdmin = require('../middlewares/allowAdmin')

const hotelController = require('../controllers/hotel')

// Controllers -----

router.get('/details', validateToken, hotelController.details_for_offline_get)

router.get('/:hotelid', validateToken, hotelController.details_get)

router.get('/:hotelid/floors', validateToken, hotelController.list_floors_get)

router.get('/:hotelid/rooms', validateToken, hotelController.list_rooms_get)

router.get('/', validateToken, allowAdmin, hotelController.list_get)

router.post('/', validateToken, allowAdmin, hotelController.create_post)

router.post(
  '/:hotelid/floors',
  validateToken,
  allowAdmin,
  hotelController.create_floor_post
)

router.post(
  '/:hotelid/rooms',
  validateToken,
  allowAdmin,
  hotelController.create_room_post
)

router.post(
  '/:hotelid/users',
  validateToken,
  allowAdmin,
  hotelController.create_user_post
)

router.delete(
  '/:hotelid',
  validateToken,
  allowAdmin,
  hotelController.delete_delete
)

router.get('/', (req, res) => {
  res.send('Please read documentation for the API. (hotel)')
})

// Export -----
module.exports = router
