const jwt = require('jsonwebtoken')
class TokenService{
    verifyAccessToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        }
        catch(error){
            return null
        }
    }
}
module.exports = new TokenService()//создаем новый экземпляр класса TokenService