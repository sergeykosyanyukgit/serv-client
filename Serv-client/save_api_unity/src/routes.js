const ItemController = require('./controllers/itemController') // подключаем item controller
const UserController = require('./controllers/userController') // подключаем user controller
const UserItemsController = require('./controllers/UserItemsController') // подключаем useritem controller
const validateon = require('./validation/Index')
const auchuser = require('./controllers/auchController')
module.exports = (app) => {
  app.get('/', ItemController.getallitems)
  app.post('/createitem', ItemController.createitem)
  app.post('/updateitem', ItemController.updateitem)

  app.get('/getallusers', UserController.getallusers)
  app.get('/auth', validateon.tokenauth, UserController.auth)
  app.post('/createuser', UserController.createuser)
  app.post('/updateuser', validateon.updateuser, auchuser.auchuser, UserController.updateuser)
  app.post('/loginauth', validateon.auth, UserController.loginauth)

  app.post('/userbuyitem', UserItemsController.userbuyitem)
  app.post('/useruseitem', UserItemsController.useruseitem)
}