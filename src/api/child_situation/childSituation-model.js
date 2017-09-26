'use strict';

export default function (sequelize, DataTypes) {
  const childSituation = sequelize.define('childSituation', {
    id: {
      field: 'codsituacao',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      field: 'descricao',
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        childSituation.hasMany(models.child, {
          foreignKey: 'codsituacao'
        });
      }
    },
    tableName: 'situacao_crianca',
    freezeTableName: true,
    timestamps: false
  });
  return childSituation;
}
