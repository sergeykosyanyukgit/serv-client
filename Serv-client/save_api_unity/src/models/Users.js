module.exports = (sequelize, DataTypes) => { // инкапсулирет логический связанный код в один блок
  const Users = sequelize.define("Users", { // создание новой таблицы Users с последующими полями
    id: { // имя поля
      type: DataTypes.INTEGER, // тип данных поля
      autoIncrement: true, // автоматическое вносение данных
      primaryKey: true, // указывает, что это поле учавствует в связи(любой)
      allowNull: false // может - ли быть это поле пустым
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    oligarch: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
  return Users
}