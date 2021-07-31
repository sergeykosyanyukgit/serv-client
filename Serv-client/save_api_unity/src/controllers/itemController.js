const {Items} = require('../models') // получаем модель items из index.js

module.exports = {
  async updateitem (req, res) {
    await Items.update({
      name:req.body.name,
      cost:req.body.cost,
      image:req.body.image,
      speed:req.body.speed,
      damage:req.body.damage,
      shield:req.body.shield
    },
    {
      where:{
        id:req.body.id
      }  
    })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })
  },
  async createitem (req, res) {
    await Items.create({ // создаем новый item 
      name:req.body.name,
      cost:req.body.cost,
      image:req.body.image,
      speed:req.body.speed,
      damage:req.body.damage,
      shield:req.body.shield
    })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })
  },
  async getallitems (req, res) {
    console.log(Object.keys(Items))
    await Items.findAll() // достаем все itemps из itemps // await - обещание того, что на выходе будет какой - то результат
    .then(result => { // если все хорошо, то  |
    res.send(result) // отправляем результат |
    })
    .catch(err => { // если все плохо, то |
      res.send(err) // отправляем ошибку  |
    })
  }
}