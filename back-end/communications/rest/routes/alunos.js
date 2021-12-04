const express = require('express');
const controllers = require('../../../controllers');
const alunosController = require('../../../controllers/alunos');

const router = express.Router();

router.get('/', async (req, res) => {
    controllers.execute(req, res, await alunosController.list);
});

module.exports = router;