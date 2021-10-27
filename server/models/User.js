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
    sobrenome,
    apelido,
    nascimento: {
      type: DataType.DATEONLY,
      allowNull: true
    },
    senha,
    corPreferida,
    avatar,
    email,
    telefone,
    bio: {
      type: DataType.TEXT,
      allowNull: true
    },
    plano_id,
    papel_id,
    criadoEm: {
      type: DataType.DATE,
      allowNull: false
    },
    modificadoEm
  })
}