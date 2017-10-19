'use strict';

export default function (Sequelize, DataTypes) {
  const User = Sequelize.define('user', {
    id: {
      field: 'coduser',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      field: 'nome',
      type: DataTypes.STRING(200),
      allowNull: false
    },
    user: {
      field: 'login',
      type: DataTypes.STRING(200),
      allowNull: false
    },
    pass: {
      field: 'senha',
      type: DataTypes.STRING(200),
      allowNull: false
    },
    func: {
      field: 'funcao',
      type: DataTypes.STRING(200),
      allowNull: true
    },
    privilegy: {
      field: 'tipo_user',
      type: DataTypes.STRING(20),
      allowNull: false
    },
    status: {
      field: 'status',
      type: DataTypes.STRING(200),
      allowNull: false
    },
    entryDate: {
      field: 'dt_inclusao',
      type: DataTypes.DATE
    },
    updatedAt: {
      field: 'dt_ult_alteracao',
      type: DataTypes.DATE(3),
      defaultValue: Sequelize.NOW
    }
  }, {
    tableName: 'usuario',
    freezeTableName: true,
    timestamps: false
  });

  return User;
}
