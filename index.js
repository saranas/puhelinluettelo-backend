const express = require('express')

const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const app = express()

app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended: true}))


app.use(morgan('common'))
app.use(cors())
app.use(express.static('build'))

/*

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Martti Tienari",
      "number": "040-123456",
      "id": 2
    },
    {
      "name": "Arto Järvinen",
      "number": "040-123456",
      "id": 3
    },
    {
      "name": "Lea Kutvonen",
      "number": "040-123456",
      "id": 4
    }
  ]

const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number
  }
}
*/

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  //res.json(persons)
  Person
    .find({})
    .then(people => {
      res.json(people.map(Person.format))
    })
})

app.get('/info', (req, res) => {
  res.send('<p>Puhelinluettelossa on </p>' + persons.length 
    +'<p> henkilön tiedot</p>' + new Date())
})

app.get('/api/persons/:id', (request, response) => {
  /*const id = Number(request.params.id)
  const person = persons.find(person => person.id === id )
  if ( person ) {
    response.json(person)
  } else {
    response.status(404).end()
  }*/

  Person
    .findById(request.params.id)
    .then(person => {
      response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


app.post('/api/persons', (request, response) => {
  console.log(request.query)
  const body = request.body
  //const body = request.query

  const namelist = persons.map(person => person.name)

  //console.log('Tääääällä')
  //console.log(request)

  if (body.name === undefined) {
    return response.status(400).json({error: 'name missing'})
  } else if (body.number === undefined) {
    return response.status(400).json({error: 'number missing'})
  } else if (namelist.includes(body.name)) {
    return response.status(400).json({error: 'person already exists'})
  } 

  const person = {
    name: body.name,
    number: body.number,
    id: (Math.random() * (100 - 4) + 4)
  }

  person
    .save()
    .then(savedPerson => {
      response.json(savedPerson)
    })

  
  /*

  console.log(person.id + 'henkilön id')

  persons = persons.concat(person)

  response.json(person)
  */
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})