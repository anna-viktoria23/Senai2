const express = require('express');
const router = express.Router();
const animalRoutes = require('./animalRouter');

router.use('/api/animais', animalRoutes);

module.exports = router;
