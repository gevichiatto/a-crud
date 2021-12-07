const Sequelize = require('sequelize');

module.exports = sequelize => {
	class alunos extends Sequelize.Model {
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
		nome: Sequelize.DataTypes.STRING,
		endereco: Sequelize.DataTypes.STRING,
		foto: Sequelize.DataTypes.BLOB('long')
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