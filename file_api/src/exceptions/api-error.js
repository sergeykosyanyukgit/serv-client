module.exports = class ApiError extends Error{
    constructor(status, messege, errors){
        super(messege)
        this.status = status
        this.errors = errors
    }
    static UnaftorizedError(){
        return new ApiError(401,'пользователь не авторизован')
    }
    static BadRequest(messege, errors = []){
        return new ApiError(400, messege, errors)
    }
}