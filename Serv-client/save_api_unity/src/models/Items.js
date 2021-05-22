module.exports = (sequelize, DataTypes) => { // инкапсулирет логический связанный код в один блок
  const Items = sequelize.define("Items", { // создание новой таблицы items с последующими полями
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
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    damage: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shield: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
  return Items
}