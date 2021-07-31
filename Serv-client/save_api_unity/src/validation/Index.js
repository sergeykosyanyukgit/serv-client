const joi=require('joi')
module.exports={
  async auth(req,res,next){
    const schema=joi.object({
      login:joi.string().alphanum().min(3).max(20),
      password:joi.string().alphanum().min(3).max(20)
    })
    try{
      const value=await schema.validateAsync(req.body)
      next()
    }
    catch(error){
      res.status(400).send({error:'ты шо э'})
    }
  },
  async tokenauth(req,res,next){
    const schema=joi.object({
      token: joi.string().min(1).max(1000)
    })
    try{
      const value=await schema.validateAsync(req.body)
      next()
    }
    catch(error){
      res.status(400).send({error:'token is not correct'})
    }
  },
  async updateuser(req,res,next){
    const schema=joi.object({
      name:joi.string().alphanum().min(3).max(20),
      score:joi.number(),
      oligarch:joi.number(),
      avatar:joi.string(),
      email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com','net','ru','uk'] } }),
      login:joi.string().alphanum().min(3).max(20),
      password:joi.string().alphanum().min(3).max(20)
    })
    try{
      const value=await schema.validateAsync(req.body)
      next()
    }
    catch(error){
      res.status(400).send({error:'user update failed'})
    }
  }
}