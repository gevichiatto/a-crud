const repository = require('../repository');

module.exports = {
    listAlunos() {
        return repository.alunos.findAllAlunos();
    },

    createAluno(data) {
        return repository.alunos.createAluno(data);
    },

    deleteByID(id) {
        return repository.alunos.deleteByID(id);
    },

    updateByID(id, data) {
        return repository.alunos.updateByID(id, data);
    }
};