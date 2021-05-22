module.exports = (sequelize, DataTypes) => { // инкапсулирет логический связанный код в один блок
  const UserItems = sequelize.define("UserItems", { // создание новой таблицы items с последующими полями
    id: { // имя поля
      type: DataTypes.INTEGER, // тип данных поля
      autoIncrement: true, // автоматическое вносение данных
      primaryKey: true, // указывает, что это поле учавствует в связи(любой)
      allowNull: false // может - ли быть это поле пустым
    },
    used: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  })
  return UserItems
}