const ApiError = require('../exceptions/api-error')
const tokenService = require('../services/token-service')

module.exports = function (req, res, next) {
    try {
        console.log('authorizationHandler0')
        const autorizationhandler = req.headers.authorization;
        if(!autorizationhandler){
            return next(ApiError.UnaftorizedError())
        }
        const accessToken = autorizationhandler.split(' ')[1]
        if(!accessToken){//accessToken действителен небольшое колличество времени
            return next(ApiError.UnaftorizedError())
        }
        const userData = tokenService.verifyAccessToken(accessToken)
        if(!userData){
            return next(ApiError.UnaftorizedError())
        }
        req.user = userData
        next()
    }
    catch(error){
        return next(ApiError.UnaftorizedError())
    }
}