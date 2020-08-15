require('dotenv').config()
const express = require('express')
const { response, json } = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Note = require('./models/note')


app.use(cors())
app.use(express.json())
app.use(express.static('build'))

    morgan.token("data",(req,res) =>{
        return JSON.stringify({
            name:req.body.name,
            number: req.body.number
        })
    })
    
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
    

let contacts = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id:1

    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id:2

    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id:3

    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id:4

    }
]

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


app.post('/api/persons', (req,res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    }
    else if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }
    else if (contacts.filter(contact => contact.name.toLowerCase() === body.name.toLowerCase()).length>0){
        return res.status(400).json({
            error: 'name must be unique'
        })
    } else  {

        const note = new Note({
            name:body.name,
            number: body.number,
        })
    
        note.save().then(savedNote => {
            res.json(savedNote.toJSON())
          })

    }

    

})

app.delete('/api/persons/:id',(req,res,next) => {
    Note.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end('Deleted contact successfully')
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    console.log(body)

    const note = {
      name: body.name,
      number: body.number,
    }
  
    Note.findByIdAndUpdate(req.params.id, note)
      .then(updatedNote => {
        res.json(updatedNote.toJSON())
      })
      .catch(error => next(error))
  })



const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })