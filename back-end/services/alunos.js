const repository = require('../repository');

module.exports = {
    listAlunos() {
        return repository.alunos.findAllAlunos();
    },

    createAluno(data) {
        return repository.alunos.createAluno(data);
    }
};