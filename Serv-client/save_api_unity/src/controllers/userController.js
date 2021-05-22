const { request } = require('express')
const { JsonWebTokenError } = require('jsonwebtoken')
const {Users} = require('../models')
const {Items} = require('../models')

const jwt = require('jsonwebtoken')

module.exports = {
  async updateuser (req, res) {
    console.log('user updated')
    console.log(req.signedCookies.token)
    await Users.update({
      name:req.body.name,
      oligarch:req.body.oligarch,
      avatar:req.body.avatar,
      score:req.body.score,
      password:req.body.password,
      email:req.body.email,
      login:req.body.login
    },
    {
      where:{
        token:req.signedCookies.token
      }  
    })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })
  },
  async createuser (req, res) {
      let token = await jwt.sign({
        password:req.body.password,
        login: req.body.login
      }, "TOKEN1")
    
    await Users.create({ // создаем новый user 
      name:req.body.name,
      oligarch:150,
      avatar:'',
      score:0,
      token:token,
      password:req.body.password,
      email:req.body.email,
      login:req.body.login
    })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(404).send(err)
    })
  },
  async getallusers (req, res) {
    await Users.findAll({
      include:[
        {
          model: Items,
          attributes:['id','speed','damage','shield','name']
        }
      ]
    })
    .then(result => { // если все хорошо, то  |
    res.send(result) // отправляем результат |
    })
    .catch(err => { // если все плохо, то |
      res.send(err) // отправляем ошибку  |
    })
  },
  async auth (req, res) {
    await Users.findOne({
      include:[
        {
          model: Items,
          attributes:['id','speed','damage','shield','name']
        }
      ]
    },
    {
      where:{token: req.body.token}
    })
    .then(result => { // если все хорошо, то  |
    res.send(result) // отправляем результат |
    })
    .catch(err => { // если все плохо, то |
      res.send(err) // отправляем ошибку  |
    })
  },
  async loginauth (req, res) {
    let token = await jwt.sign({
      password:req.body.password,
      login: req.body.login
    }, "TOKEN1")
    await Users.update({
      token:token
    },{
      where:{login: req.body.login, password: req.body.password},
    })
    await Users.findOne(
    {
      where:{login: req.body.login, password: req.body.password},  
      include:[
        {
          model: Items,
          attributes:['id','speed','damage','shield','name']
        }
      ]
    }
    )
    .then(result => { // если все хорошо, то  |
      if(result == null){
        res.status(404).send({error: "User Not Found"})
        return;
      }
      res.cookie('token',token,{signed:true})
      res.send(result) // отправляем результат |
    })
    .catch(err => { // если все плохо, то |
      res.send(err) // отправляем ошибку  |
    })
  }
}