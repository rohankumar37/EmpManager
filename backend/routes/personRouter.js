const express = require('express');
const personRouter = express.Router();
const { listPersons, addPerson, editPerson, deletePerson } = require('../controllers/person.js');

// list all persons in database
personRouter.get('/', listPersons);
// adds a new person to database
personRouter.post('/', addPerson);
// edit person's name, email, or age
personRouter.put('/:id', editPerson);
//sets isDeleted attribute of any person to true
personRouter.delete('/:id', deletePerson);

module.exports = personRouter;
