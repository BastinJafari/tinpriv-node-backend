const numOfChars = 94 //all visible ascii characters
const firstChar = 33 //first visible ascii char

const hashToString = (hash) => {
    let hashString = ''

    if (hash < numOfChars) {
        return String.fromCharCode(hash+firstChar)
    } else {

        while(hash > 0) {
            const remainderWithoutZero = (hash % numOfChars)
            hashString += String.fromCharCode(remainderWithoutZero  + firstChar)
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
        hash += (letter.charCodeAt(0) - firstChar) * factor 
        factor *= numOfChars
    });

    return hash
}

module.exports = {hashToString, stringToHash}