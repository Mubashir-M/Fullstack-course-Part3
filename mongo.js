const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.35eso.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Note = mongoose.model('Note', noteSchema)

if (process.argv.length>3){
    const note = new Note({
        name: process.argv[3],
        number: process.argv[4],
    })

    console.log(`added ${note.name} number ${note.number} to phonebook`)

    note.save().then(() => {
        console.log(note)
        mongoose.connection.close()
    })

} else {
    console.log('phonebook:')
    Note.find({}).then(result => {
        result.forEach(document => {
            console.log(`${document.name} ${document.number}`)
        })
        mongoose.connection.close()
    })
}