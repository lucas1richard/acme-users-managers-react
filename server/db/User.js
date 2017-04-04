module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    name: DataTypes.STRING,
    isManager: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    scopes: {
      managers: {
        where: { isManager: true }
      }
    },
    classMethods: {
      changeManager(userId, managerId) {
        return Promise.all([
          this.findById(userId),
          // If someone has an id of -1, they need to re-evaluate their life
          this.findOne({ where: { id: managerId * 1 || -1 } })
        ])
        .then(([ user, manager ]) => user.setManager(manager));
      },
      usersWManagers() {
        return this.findAll({
          include: [ { model: this, as: 'manager' } ]
        });
      }
    }
  });
};
