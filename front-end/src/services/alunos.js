import api from './api'

export default {
    getAlunos() {
        return api.execute('get', '/api/alunos', null, null, true)
    },

    async postAluno(aluno) {
        return api.execute('post', '/api/alunos', null, aluno)
    },

    deleteAluno(id) {
        return api.execute('delete', `/api/alunos/${id}`)
    },

    async updateAluno(aluno) {
        return api.execute('put', `/api/alunos/${aluno.id}`, null, aluno)
    }
}