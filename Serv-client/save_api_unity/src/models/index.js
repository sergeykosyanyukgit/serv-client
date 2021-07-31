const fs = require('fs') // fc - file_system библиотека для работы с файловой системой
const path = require('path') // - path модель для работы с путями файловой системы
const db = {}

const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')


const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const sequelize = new Sequelize("unity_test", "root", "PASSWORD", {
  dialect: "mysql",
  host: "localhost"
})
//////define models
fs
.readdirSync(__dirname) // читаем файлы в папке, где находится этот скрипт (__dirname)
.filter((file) => // фильтруем файлы 
  file !== 'index.js'
)
.forEach((file) => {
  const model = sequelize.import(path.join(__dirname, file)) // импортируем модель из файла
  db[model.name] = model // добавлем в объект db новый ключ, который является менем файла и записываем модель туда
})

let Items = db['Items']
let Users = db['Users']
let UserItems = db['UserItems']
 
Items.belongsToMany(Users, {through: UserItems});//делаем связь многие ко многим и вносим значения в таблицу useritems            items & users -> useritems
Users.belongsToMany(Items, {through: UserItems});//user & items -> useritems

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "TOKEN1"
  }, async (jwtPayload, done) =>{
    let user = await Users.findOne({
      where: {
        login: jwtPayload.login,
        password: jwtPayload.password
      }
    })
    if(user) {
      return done(null, user)
    } 
    else 
    {
      return done(null, false)
    }
  })
)

db.sequelize = sequelize
db.Sequelize = Sequelize
module.exports = db
