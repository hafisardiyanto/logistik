const express = require('express')
const router = express.Router()
const {
  getSettings,
  getSetting,
  createSetting,
  updateSetting,
  bulkUpdateSettings,
  deleteSetting
} = require('../controllers/appSetting.controller')

router.get('/', getSettings)
router.get('/:id', getSetting)
router.post('/', createSetting)
router.put('/bulk', bulkUpdateSettings)
router.put('/:id', updateSetting)
router.delete('/:id', deleteSetting)

module.exports = router
