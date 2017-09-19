'use strict';

export default function (sequelize, DataTypes) {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      field: 'name',
      type: DataTypes.STRING(200),
      allowNull: false
    },
    active: {
      field: 'active',
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    classMethods: {
      associate: function (models) {
      }
    },
    tableName: 'user',
    freezeTableName: true,
    timestamps: false
  });
  return User;
}
