const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const config = require('./config')
const path = require ('path')
const fs = require('fs')
const https = require('https')

const NODE_ENV = process.env.NODE_ENV
const app = express()
app.use(fileUpload())
app.use(express.json({
    limit:'100mb'
}))
app.use(express.urlencoded({
    limit:'100mb'
}))
app.use(cors({
    credentials:true,
    origin:process.env.CLIENT_URL
}))
app.use(express.static(path.join(__dirname,'public')))
app.listen(config.development.port)
/*location / {
    proxy_pass http://bye_bye_world/;
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Host $server_name;
}*/
//nginx(bye_bye_world)