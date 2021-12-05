const models = require('../database/models/index');

module.exports = {
    findAllAlunos() {
        return models.Alunos.findAll({
            attributes: ["id", "nome", "endereco", "foto"],
            where: { deletedAt: null },
            raw: true,
        });
    },

    createAluno(data) {
        return models.Alunos.create(data);
    }
}