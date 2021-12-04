const express = require('express');

const router = express.Router();

router.use('/api/alunos', require('./alunos'));

module.exports = router;