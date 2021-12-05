const services = require('../services');

exports.list = async (req, res, callback) => {
    try {
        const alunos = await services.alunos.listAlunos();
        callback(null, 200, alunos);
    } catch (e) {
        callback({
            errorMessage: typeof e === 'string' ? e : 'Falha ao listar dados no banco de dados',
            error: e,
        }, typeof e === 'string' ? 400 : 500);
    }
};

exports.create = async (req, res, callback) => {
    try {
        let data = {
            nome: req.body.nome,
            endereco: req.body.endereco,
            foto: req.body.foto
        }

        let result = await services.alunos.createAluno(data);
        callback(null, 200, result)
    } catch (e) {
        callback({
            errorMessage: "Falha ao inserir dados no banco de dados",
            error: e
        }, 500);
    }
};