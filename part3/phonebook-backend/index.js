const express = require('express')
const morgan = require('morgan')

const app = express()

// Middleware
app.use(express.json())

// Morgan custom token for logging request body
morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

// Morgan logging configuration
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

const PORT = 3001

let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
]

// 3.1 GET all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// 3.2 Info page
app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `)
})

// 3.3 GET single person
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).json({ error: 'person not found' })
  }
})

// 3.4 DELETE person
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

// 3.5 & 3.6 POST new person with validation
app.post('/api/persons', (request, response) => {
  const body = request.body

  // Validation: missing fields
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  // Validation: duplicate name
  const nameExists = persons.some(p => p.name === body.name)

  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    id: Math.floor(Math.random() * 1000000).toString(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)

  response.status(201).json(newPerson)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})