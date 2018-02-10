const mongoose = require('mongoose')

const url = 'mongodb://fullstack:mangusti@ds229418.mlab.com:29418/puhelinluettelo'

mongoose.connect(url)

//const Schema = mongoose.Schema

var personSchema = new mongoose.Schema({ name: String, number: String})

personSchema.statics.format = (function(person) {
	return {
    	name: person.name,
    	number: person.number
  	}
})

const Person = mongoose.model('Person', personSchema)


module.exports = Person