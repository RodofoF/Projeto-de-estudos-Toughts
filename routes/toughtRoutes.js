const express = require('express')
const router = express.Router()
const ThoughtController = require('../controllers/toughtController')

router.get('/',ThoughtController.showToughts)

module.exports = router