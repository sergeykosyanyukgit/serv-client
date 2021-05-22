const {Users} = require('../models')
const {Items} = require('../models')
const {UserItems} = require('../models')
console.log (Object.keys(UserItems))
module.exports = {
  async useruseitem (req,res) {
    console.log(req.signedCookies.token)
    await Users.findOne({where: {id:1}})
    .then(user => {
      console.log(user.token)
    })
    await Users.findOne({where: {token:req.signedCookies.token}})
    .then(async user=>{
      if(!user) 
      {
        res.send({err:"error 404 user not found"})
        return;
      }
      await user.getItems({
        where:{
          id:req.body.ItemId
        }
      })
      .then(async result => {
        await UserItems.update({used: req.body.status}, {where: {id: req.body.ItemId}})   
        .then(result => {
          console.log("true on the thing that mani programists will name used")
          res.send (result)
        })
        .catch(err => {
          res.send(err)
        })  
      })
      .catch(err => {
        res.send(err)
      })  
    })  
    .catch(err => {
      res.send(err)
    })
  },
  async userbuyitem (req, res) {
    await Users.findOne({where: {token: req.signedCookies.token}})
    .then(async user=>{
      if(!user) 
      {
        res.send({err:"error 404 user not found"})
        return;
      }
      await user.getItems({
        where:{
          id:req.body.ItemId
        }
      })
      .then(async result => {
        res.send({err:"is bought"})
        if(!result){
          res.send({err:"is bought"})
          return;
        }
        else{
          await Items.findOne({where: {id:req.body.ItemId}})
        .then(async item=>{
          if(!item) 
          {
            res.send({err:"error 404 item not found"})
            return;
          }
          if (user.oligarch - item.cost >= 0) {
            /*let p = user.oligarch - item.cost
            console. log(p)*/
            await Users.update({oligarch: user.oligarch-item.cost}, {where: {token: req.signedCookies.token}})
          } else {
            res.send({err:"u are not oligarch"})
            return;
          }
          await user.addItem (item, {through:{used:false}})
          .then(result => {
            res.send (result)
          })
          .catch(err => {
            res.send(err)
          })  
        })
        .catch(err => {
          res.send(err)
        })  
        }
      })
      .catch(err => {
        res.send(err);
      })
    })
    .catch(err => {
      res.send(err)
    })
  }
}