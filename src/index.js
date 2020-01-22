const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const hbs = require('hbs')
const path = require('path')
const ObjectID = require('mongodb').ObjectID
const convert = require('./utils/convert')
const val = require('./middleware/validation.js')
const encrypt = require('./middleware/encrypt.js')
const generateSfxKey = require('./utils/generateSfxKey.js')

const Message = require('./models/messages.js')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

require('../db/mongoose.js')

app.use(express.json())
app.use(express.static(publicDirectoryPath))

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.get('', async (req, res) => {
    console.log('get')
    const message = new Message({
        message: "Test1",
        url: "www.hackkarte.de"
    })
    try {
        await message.save()
        res.send("Test1")

    } catch (error) {
        console.log(error)

        res.status(500).send(error)
    }
    
})

app.post('', val, encrypt, async (req, res) => {   
    const sfxKey = generateSfxKey()
    const id = new ObjectID(sfxKey.dbKey)
    const message = new Message({
        message: req.body.msg,
        url: req.body.url,
        _id: id
    })

    try {
        await message.save()
        console.log("message saved")
        res.send('tinpriv.com/' + sfxKey.userKey)
    } catch (error) {
        res.status(500).send(error)
    }
})
