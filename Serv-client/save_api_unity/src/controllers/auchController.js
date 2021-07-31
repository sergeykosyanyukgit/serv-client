const {Users} = require('../models')
const {Items} = require('../models')
module.exports= {
  async auchuser(req, res, next) {
    let cookie = req.signedCookies.token
    console.log(cookie)
    await Users.findOne(
      {
        where:{token:cookie},
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
      console.log('userauch')
      next()
    })
    .catch(err => { // если все плохо, то |
      res.send(err) // отправляем ошибку  |
    })
  }
}