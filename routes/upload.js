const router = require('express').Router()

const validateToken = require('../middlewares/validateToken')

const uploadController = require('../controllers/upload')

// Controllers -----

router.post('/', validateToken, uploadController.file_post)

router.get('/', (req, res) => {
  res.send('Please read documentation for the API. (upload)')
})

// Export -----
module.exports = router
