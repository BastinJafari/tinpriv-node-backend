//todolist: 
//Check for hash collisions when saving a new secret
//Refactor and Check for double imports (enrypt uses cypher and cypher is in index.js)
//change name of DbItem message to secret to avoid message.message
//change sfxkey (sufix) to something more sensable
//rename messages to secrets in the database
//implement testing
//use put instead of post
//implement whitelist
//better server errors
//exchange hardcoded tinpriv with more generic approach
//REFACTOR!!!

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8000
const hbs = require('hbs')
const path = require('path')
const convert = require('./utils/convert')
const val = require('./middleware/validation.js')
const encrypt = require('./middleware/encrypt.js')
const farmHash = require('farmHash')
const Secret = require('./models/secrets.js')
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const mongoose = require('mongoose')
const decrypt = require('./utils/cipher').decrypt
const getSecret = require('./services/secrets.js')
require('../db/mongoose.js')

app.use(cors())
app.use(express.json())
app.use(express.static(publicDirectoryPath))

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.get('/*', async (req, res) => {
    try {
        console.log("try")
        const userKey = req.params[0]
        if (!userKey) {
            throw new Error("Must provide parameter")
        }
        const dbKey = farmHash.hash32(userKey)  //put that into getSecretService
        console.log("dbKey" +dbKey)
        const secret = await getSecret(dbKey, userKey)
        console.log("secret:" + secret)
        res.send(secret)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('', val, encrypt, async (req, res) => {   
    console.log("validated and encrypted")
    const sfxKey = req.body.sfxKey
    const secret = new Secret({
        message: req.body.message,
        url: req.body.url,
        _id: sfxKey.dbKey
    })
    try {
        await secret.save()
        console.log("message saved")
        res.send('tinpriv.com/' + sfxKey.userKey)
    } catch (error) {
        res.status(500).send(error) 
    }
})
