const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false });

const User = sequelize.import('./User');

User.belongsTo(User, { as: 'manager', foreignKey: 'managerId' });
User.hasMany(User, { as: 'manages', foreignKey: 'managerId' });

const seed = () => {
  sequelize.sync({ force: true })
    .then(() => User.bulkCreate([
      { name: 'curly', managerId: 2 },
      { name: 'larry', isManager: true, managerId: 3 },
      { name: 'moe', isManager: true }
    ]));
};

module.exports = {
  seed,
  models: {
    User
  }
};
