const repository = require('../repository');

module.exports = {
    listAlunos() {
        return repository.alunos.findAllAlunos();
    },
};