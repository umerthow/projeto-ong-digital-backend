'use strict';

export default function (Sequelize, DataTypes) {

  const User = Sequelize.define('docs', {
    id: {
      field: "coddocumento",
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
    tags: {
      field: 'tags',
      type: DataTypes.STRING(200),
      allowNull: false
    },
    fileid: {
      field: 'fileid',
      type: DataTypes.STRING(200),
      allowNull: false
    },
    user: {
      field: 'coduser',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        key: 'coduser',
        model: 'usuario'
      }
    },
    child: {
      field: 'codcrianca',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        key: 'codcrianca',
        model: 'crianca'
      }
    },
    child: {
      field: 'codcrianca',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        key: 'codcrianca',
        model: 'crianca'
      }
    },
    entryDate: {
      field: 'dt_inclusao',
      type: DataTypes.DATE(3)
    },
    updatedAt: {
      field: 'dt_ult_alteracao',
      type: DataTypes.DATE(3),
      defaultValue: Sequelize.NOW
    }
  }, {
    tableName: 'documentos',
    freezeTableName: true,
    timestamps: false
  });

  return User;
}
