const crypto = require('crypto')

const encrypt = (plainMessage, password) => {

    const key = crypto.createHash("sha256")
    .update(password)
    .digest(),
    iv = crypto.randomBytes(16),
    cipher = crypto.createCipheriv("aes256", key, iv),
    msg = []
    msg.push(cipher.update(plainMessage, "binary", "hex"))
    msg.push(cipher.final("hex"))
    const encryptedMsg = msg.join("")
    return iv.toString('hex') + ':' + encryptedMsg

}

const decrypt = (encryptedMessage, password) => {
    const key = crypto
    .createHash("sha256")
    .update(password)
    .digest(),
    ivAndMsg = encryptedMessage.split(':'),
    iv = Buffer.from(ivAndMsg[0], 'hex'),
    encryptMsgWithoutIv = ivAndMsg[1],
    decipher = crypto.createDecipheriv("aes256", key, iv),
    msg = []
    msg.push(decipher.update(encryptMsgWithoutIv, "hex", "binary"));
    msg.push(decipher.final("binary"));
    decryptedMessage = msg.join("")
    return decryptedMessage
}


module.exports = {encrypt, decrypt}