const express = require('express');
const router = express.Router();
const { getCVData, generatePDF } = require('../controllers/cv.controller');

router.get('/', getCVData);
router.get('/pdf', generatePDF);

module.exports = router;
