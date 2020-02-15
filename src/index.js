//todolist: 
//Check for hash collisions when saving a new
//Refactor and Check for double imports (enrypt uses cypher and cypher is in index.js)
//change name of DbItem message to somewhing more sensable to avoid message.message

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const hbs = require('hbs')
const path = require('path')
const convert = require('./utils/convert')
const val = require('./middleware/validation.js')
const encrypt = require('./middleware/encrypt.js')
const farmHash = require('farmHash')
const Message = require('./models/messages.js')
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const mongoose = require('mongoose')
const decrypt = require('./utils/cipher').decrypt
require('../db/mongoose.js')

app.use(express.json())
app.use(express.static(publicDirectoryPath))

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.get('/*', async (req, res) => {

    const userKey = req.params[0]
    const dbKey = farmHash.hash32(userKey)

    try {
        message = await Message.findById(dbKey)
        const decryptedMessage = decrypt(
            message.message,
            userKey
        )
        res.send(decryptedMessage)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('', val, encrypt, async (req, res) => {   
    const sfxKey = req.body.sfxKey


    const message = new Message({
        message: req.body.msg,
        url: req.body.url,
        _id: sfxKey.dbKey
    })
    console.log('Message: ' + message)
    try {
        await message.save()
        console.log("message saved")
        res.send('tinpriv.com/' + sfxKey.userKey)
    } catch (error) {
        res.status(500).send(error)
    }
})
