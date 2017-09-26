'use strict';

export default function (sequelize, DataTypes) {
  const child = sequelize.define('child', {
    id: {
      field: 'codcrianca',
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
    rg: {
      field: 'rg',
      type: DataTypes.STRING(20),
      allowNull: false
    },
    cpf: {
      field: 'cpf',
      type: DataTypes.STRING(15),
      allowNull: false
    },
    color: {
      field: 'cor',
      type: DataTypes.STRING(10),
      allowNull: false
    },
    sex: {
      field: 'sexo',
      type: DataTypes.STRING(10),
      allowNull: false
    },
    birth: {
      field: 'dt_nascimento',
      type: DataTypes.DATE,
      allowNull: false
    },
    school: {
      field: 'escola_atual',
      type: DataTypes.STRING(200),
      allowNull: false
    },
    situation: {
      field: 'codsituacao',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'codsituacao',
        model: 'childSituation'
      }
    },
    responsibleCpf: {
      field: 'cpf_responsavel',
      type: DataTypes.STRING(15),
      allowNull: true
    },
    responsibleName: {
      field: 'nome_responsavel',
      type: DataTypes.STRING(200),
      allowNull: true
    },
    responsiblePhone: {
      field: 'tel_responsavel',
      type: DataTypes.STRING(15),
      allowNull: true
    },
    entryDate: {
      field: 'dt_entrada',
      type: DataTypes.DATE,
      allowNull: false
    },
    exitDate: {
      field: 'dt_desligamento',
      type: DataTypes.DATE,
      allowNull: true
    },
    codUser: {
      field: 'coduser',
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'user'
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        child.belongsTo(models.childSituation, {
          foreignKey: 'codsituacao'
        });
        /* child.belongsTo(models.user, {
          foreignKey: 'codUser'
        }); */
      }
    },
    tableName: 'child',
    freezeTableName: true,
    timestamps: false
  });
  return child;
}
