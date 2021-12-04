'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class alunos extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};
	alunos.init({
		nome: DataTypes.STRING,
		endereco: DataTypes.STRING,
		foto: DataTypes.BLOB
	}, {
		sequelize,
		modelName: 'Alunos',
		tableName: 'alunos',
		paranoid: true,
		timestamps: true,
		underscored: true,
	});
	return alunos;
};