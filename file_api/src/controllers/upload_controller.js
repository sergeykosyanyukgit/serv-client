const fs = require('fs')
const sharp = require('sharp')
module.exports = {
    async upload(req,res){
        try{
            let sampleFile = req.files.sampleFile
            let uploadPath = __dirname + '/public2/' + sampleFile.name
            let f = (/[.]/.exec(sampleFile.name)) ? /[^.]+$/.exec(sampleFile.name) : undefined
            let newPath = null
            await sampleFile.mv(uploadPath, async function(error){
                if(error){
                    res.status(500).send(error)        
                }
                else{
                    newPath = __dirname + '/public2/' + sampleFile.name + '.' + f[0]
                    await fs.rename(uploadPath, newPath, function(error){
                        if(error){
                            res.status(500).send(error)        
                        }
                        else{
                            sharp(newPath)
                            .resize(480)
                            .toFile(__dirname + '/public/' + sampleFile.name + '.' + f[0], function(error){
                                res.send({
                                    path: req.headers.name + '.' + f[0]
                                })
                            })
                        }    
                    })
                }
            })
        }
        catch(error){
            res.status(500).send(error)
        }
    }
}