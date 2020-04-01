const encrypt = require('../utils/cipher').encrypt
const generateSfxKey = require('../utils/generateSfxKey.js')

const encry = (req, res, next) => {
    console.log('Start Encryption')
    const sfxKey = generateSfxKey()
    req.body.sfxKey = sfxKey


    try {
        console.log(req.body)
        console.log("Message: " + req.body.message)
        req.body.message = encrypt(req.body.message, sfxKey.userKey)
        console.log('message encypted')
        next()
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = encry

