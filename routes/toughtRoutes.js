const express = require('express')
const router = express.Router()
const ThoughtController = require('../controllers/toughtController')

const checkAuth = require('../helpers/auth').checkAuth

router.get('/add',checkAuth, ThoughtController.createTought)
router.post('/add',checkAuth, ThoughtController.createToughtSave)
router.get('/dashboard',checkAuth, ThoughtController.dashboard)
router.get('/',ThoughtController.showToughts)


module.exports = router