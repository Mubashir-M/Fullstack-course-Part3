const express = require('express')
//const { response, json, query } = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Note = require('./models/note')


app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('data',(req) => {
    return JSON.stringify({
        name:req.body.name,
        number: req.body.number
    })
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

/*let contacts = [
    {
        name: 'Arto Hellas',
        number: '040-123456',
        id:1

    },
    {
        name: 'Ada Lovelace',
        number: '39-44-5323523',
        id:2

    },
    {
        name: 'Dan Abramov',
        number: '12-43-234345',
        id:3

    },
    {
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
        id:4

    }
]*/

app.get('/api/persons', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes.map(note => note.toJSON()))
    })
})

app.get('/info', (req,res) => {
    const date = new Date()

    Note.find({}).then(notes => {
        res.send(`<p>Phonebook has info for ${notes.length} people<br>${date}}</p>`)
    })
})

app.get('/api/persons/:id',(req,res,next) => {
    Note.findById(req.params.id).then(note => {
        if (note) {
            res.json(note)
        } else {
            res.status(404).end()
        }
    })
        .catch(error => next(error))
})


app.post('/api/persons', (req,res,next) => {
    const body = req.body
    const note = new Note({
        name:body.name,
        number: body.number,
    })
    note.save().then(savedNote => {
        res.json(savedNote.toJSON())
    })
        .catch(error => next(error))
})

app.delete('/api/persons/:id',(req,res,next) => {
    Note.findByIdAndRemove(req.params.id)
        .then(result => {
            console.log(result)
            res.status(204).end('Deleted contact successfully')
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    console.log('here is req.params.id:' ,req.params.id)

    const note = {
        name: body.name,
        number: body.number,
    }

    Note.findByIdAndUpdate(req.params.id, note,{ runValidators:true, context: 'query' })
        .then(updatedNote => {
            res.json(updatedNote.toJSON())
        })
        .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    }   else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})