const models = require('../database/models/index');

module.exports = {
    findAllAlunos() {
        return models.Alunos.findAll({
            attributes: ["nome", "endereco", "foto"],
            where: { deletedAt: null },
            raw: true,
        });
    }
}