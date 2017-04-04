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
          this.findById(managerId)
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
