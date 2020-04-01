const crypto = require('crypto')

const encrypt = (plainMessage, password) => {

    const key = crypto.createHash("sha256")
    .update(password)
    .digest(),
    iv = crypto.randomBytes(16),
    cipher = crypto.createCipheriv("aes256", key, iv),
    message = []
    message.push(cipher.update(plainMessage, "binary", "hex"))
    message.push(cipher.final("hex"))
    const encryptedMessage = message.join("")
    return iv.toString('hex') + ':' + encryptedMessage

}

const decrypt = (encryptedMessage, password) => {
    const key = crypto
    .createHash("sha256")
    .update(password)
    .digest(),
    ivAndMessage = encryptedMessage.split(':'),
    iv = Buffer.from(ivAndMessage[0], 'hex'),
    encryptMessageWithoutIv = ivAndMessage[1],
    decipher = crypto.createDecipheriv("aes256", key, iv),
    message = []
    message.push(decipher.update(encryptMessageWithoutIv, "hex", "binary"));
    message.push(decipher.final("binary"));
    decryptedMessage = message.join("")
    return decryptedMessage
}


module.exports = {encrypt, decrypt}