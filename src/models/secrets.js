const mongoose = require('mongoose')
const validator = require('validator')


const messageSchema = new mongoose.Schema({
    message: {
        type: String,
    },
    url: {
        type: String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error('Invalid URL')
            }
        }
    },
    _id: {
        type: Number,
        required: true,
    }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message