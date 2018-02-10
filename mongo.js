const mongoose = require('mongoose')

const url = 'mongodb://fullstack:mangusti@ds229418.mlab.com:29418/puhelinluettelo'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

const person = new Person({
  name: process.argv[2],
  number: process.argv[3]
})

if (person.name && person.number) {
person
  .save()
  .then(response => {
    console.log('Lisätään henkilö ' + person.name 
      + person.number  + ' luetteloon')
    mongoose.connection.close()
  })
  }

  else {
  console.log('Puhelinluettelo!')
  Person
  .find({})
  .then(result => {
    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
  
}