module.exports = (sequelize, DataType) => {
  const User = sequelize.define('User', {
    id: {
      type: DataType.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nome: {
      type: DataType.STRING(50),
      allowNull: false
    },
    sobrenome: {
      type: DataType.STRING(50),
      allowNull: false
    },
    apelido: {
      type: DataType.STRING(50),
      allowNull: true
    },
    nascimento: {
      type: DataType.DATEONLY,
      allowNull: true
    },
    senha: {
      type: DataType.STRING(512),
      allowNull: false
    },
    corPreferida: {
      type: DataType.STRING(7),
      allowNull: false
    },
    avatar: {
      type: DataType.STRING(150),
      allowNull: true,
      defaultValue: '/images/user-placeholder.png'
    },
    email: {
      type: DataType.STRING(150),
      allowNull: false
    },
    telefone: {
      type: DataType.STRING(13),
      allowNull: true
    },
    bio: {
      type: DataType.TEXT,
      allowNull: true
    },
    plano_id: {
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1
    },
    papel_id: {
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 2
    },
    criadoEm: {
      type: DataType.DATE,
      allowNull: false
    },
    modificadoEm: {
      type: DataType.DATE,
      allowNull: false
    }
  }, {
    tableName: 'users',
    timestamps: false
  })
  return User
}