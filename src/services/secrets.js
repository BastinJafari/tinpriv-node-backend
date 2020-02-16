require('../../db/mongoose.js')

const Secret = require('../models/secrets.js')
const decrypt = require('../utils/cipher.js').decrypt

const getSecret = async (dbKey, userKey) => {

    try {
        secret =  await Secret.findById(dbKey)
        console.log(secret)
        if (!secret) {
            throw new Error("No secret found")
        }
        if (secret.message){
            decryptedMessage = decrypt(secret.message, userKey)
            secret.message = null
            await secret.save()
            secret.message = decryptedMessage
            return secret
        }
        return secret

    } catch (error) {
        return error
    }

}


module.exports = getSecret