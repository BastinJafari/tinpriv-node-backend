const validAlphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.~'
const numOfChars = validAlphabet.length


const hashToString = (hash) => {

    console.log("number is " + hash)
    let hashString = ''

    if (hash < numOfChars) {
        return validAlphabet[hash]
    } else {

        while(hash > 0) {
            const remainder = (hash % numOfChars)
            hashString += validAlphabet[remainder]
            hash = Math.floor(hash/numOfChars)
        }
        return hashString
    }

 
}

const stringToHash = (str) => {
    const reversedString = [...str]
    let hash = 0
    let factor = 1

    reversedString.forEach(letter => {
        hash += (validAlphabet.indexOf(letter)) * factor 
        factor *= numOfChars
    });

    return hash
}

module.exports = {hashToString, stringToHash}