const encrypt = require('../utils/cipher').encrypt

const encry = (req, res, next) => {
    console.log('Start Encryption')

    try {
        req.body.msg = encrypt(req.body.msg, "hallo ballo")
        console.log('message enrypted')
        next()
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = encry

