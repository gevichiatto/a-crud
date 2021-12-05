const express = require('express');
const controllers = require('../../../controllers');
const alunosController = require('../../../controllers/alunos');

const router = express.Router();

router.get('/', async (req, res) => {
    controllers.execute(req, res, await alunosController.list);
});

router.post('/', async (req, res) => {
    controllers.execute(req, res, await alunosController.create);
})

router.delete('/:id', async (req, res) => {
    controllers.execute(req, res, await alunosController.delete)
})

module.exports = router;