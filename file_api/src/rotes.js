const auchMiddleWare = require('./middlewares/auth-midleware')
const uploadController = require('./controllers/upload_controller')
module.exports = async(app)=>{
    await app.put('//upload',auchMiddleWare, uploadController.upload)
}