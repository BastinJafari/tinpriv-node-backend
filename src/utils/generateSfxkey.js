const bytesForRandom = 8,
crypto = require('crypto'),
farmHash = require('farmHash'),
convert = require('./convert')



    const generateSfxkey = () => {
        randomBytes = crypto.randomBytes(bytesForRandom),
        userKeyAsNum = farmHash.hash32(randomBytes),
        userKeyAsString = convert.hashToString(userKeyAsNum)
        keyDataBase = farmHash.hash32(userKeyAsString)
        
        return {
            userKey: userKeyAsString,
            dbKey: keyDataBase
        }
    
    }


module.exports = generateSfxkey