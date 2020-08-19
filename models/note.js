
const mongoose = require('mongoose')
const uniqueValidator = require ('mongoose-unique-validator')
const url = process.env.MONGODB_URI
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
console.log('connecting to', url)

//had to add String() around url otherwise heroku link application wouldn't work
mongoose.connect(String(url), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },

    number: {
        type: String,
        required: true,
        minlength: 8,
        unique: true
    },
})

noteSchema.plugin(uniqueValidator)

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)
//const Note = mongoose.model('Note', noteSchema)
