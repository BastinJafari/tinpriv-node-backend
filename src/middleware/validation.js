const validator = require('validator')

const val = (req, res, next) => {
    console.log('Start Validation')
    try {
        if(!validator.isURL(req.body.url)) {
            throw new Error('Please provide valid URL')
        }
        next()
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = val