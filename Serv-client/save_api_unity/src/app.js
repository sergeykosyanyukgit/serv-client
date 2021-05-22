const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const app = express()
app.use(cookieParser('secret'))
const { sequelize } = require('./models')
app.use(bodyParser.json())
app.use(cors({
  origin:'http://localhost:8080',
  credentials:true,
  expires:new Date(Date.now()+90000),
  httpOnly:true
}))
require('./routes')(app)

sequelize.sync({force: false})
.then(() => {
  app.listen(3000, () => {
    console.log('server started on 3000 port')
  })
})
.catch((err) => {
  console.log(`Data server not started!`, err)
})
