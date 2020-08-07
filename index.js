const express = require('express')
const { response, json } = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

    
    app.use(express.json())
    app.use(cors())

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
    res.json(contacts)
  })

app.get('/info', (req,res) => {
    const count = contacts.length
    const date = new Date()
    console.log('count and date',count,date)
    res.send(`<p>Phonebook has info for ${count} people<br>${date}}</p>`)
})

app.get('/api/persons/:id',(req,res) => {
    const id = Number (req.params.id)
    const contact = contacts.find(contact => contact.id === id)

    if (contact) {
        res.json(contact)
    } else {
        res.status(404).end()
    }
})


app.post('/api/persons', (req,res) => {
    const GeneratedId = Math.floor(Math.random() * 100000);
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
    }

    const contact = {
        name:body.name,
        number: body.number,
        id : GeneratedId
    }

    contacts = contacts.concat(contact)
    res.json(contact)

})

app.delete('/api/persons/:id',(req,res) => {
    const id = Number(req.params.id)
    contacts = contacts.filter(contact => contact.id !== id)
    res.status(404).end('Deleted conctact successfully')
})







  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })