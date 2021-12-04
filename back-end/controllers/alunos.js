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