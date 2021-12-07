'use strict';

const fs = require('fs')

const img = fs.readFileSync('./sol.jpg', (err, data) => {
	if (err) {
		console.error("Arquivo não lido!", err)
		throw err
	}
	else console.log("Arquivo lido: ", data)
})

const alunos = [{
	nome: "Sol",
	endereco: "Sistema Solar, nº 1, Via Láctea",
	foto: img,
}]

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("alunos", alunos);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("alunos", {
			nome: alunos.map(a => a.nome),
		});
	}
};
