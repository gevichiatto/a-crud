const models = require('../database/models/index');
const imageDataURI = require('image-data-uri');

module.exports = {
    findAllAlunos() {
        return models.Alunos.findAll({
            attributes: ["id", "nome", "endereco", "foto"],
            where: { deletedAt: null },
            raw: true,
        });
    },

    async createAluno(data) {
        var img = await imageDataURI.decode(data.foto);
        return models.Alunos.create({
            nome: data.nome,
            endereco: data.endereco,
            foto: img.dataBuffer
        });
    },

    deleteByID(id) {
        return models.Alunos.update({
            deletedAt: new Date()
        }, {
            where: { id: id }
        })
    }
}