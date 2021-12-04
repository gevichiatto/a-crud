import api from './api'

export default {
    getAlunos() {
        return api.execute('get', '/api/alunos', null, null, true)
    }
}