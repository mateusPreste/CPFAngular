module.exports = (sequelize, Sequelize) => {
	const Customer = sequelize.define('customer', {
	  cpf: {
			type: Sequelize.STRING, 
			allowNull: false,
			primaryKey: true,
	  },
	  name: {
			type: Sequelize.STRING, 
			allowNull: false,
	  }
	});
	
	return Customer;
}