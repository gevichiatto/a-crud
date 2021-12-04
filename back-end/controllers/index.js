/**
 * execute: Executa a função recebida através de um callback.
 * @param {Function} func Elemento que será checado
 */
 exports.execute = (req, res, func) => {
    func(req, res, (err, code, ret) => execCallback(res, err, code, ret, req));
};
  
/**
 * execCallback: Retorna uma resposta rest
 * @param {Number} code Código Restful que será retornado
 * @param {Object} ret Informações de resposta
 */
function execCallback(res, err, code, ret, req) {
    let responseReturned = ret;
    if (err) {
        // Não retorna a msg de erro original para o client caso seja um erro interno
        if (code >= 500) {
        logger(
            req,
            'emerg',
            'controller callback error',
            err.errorMessage,
            (err.error && err.error.stack) || null,
            moment().diff(req.momentInit, 'ms'),
            code,
        );
        responseReturned = { error: 'Internal Server Error.' };
        } else {
        responseReturned = { error: err };
        }
    }

    if (responseReturned && code !== 204) {
        res.status(code).send(responseReturned);
    } else {
        res.sendStatus(code);
    }
}
  