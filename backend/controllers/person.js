const Person = require('../models/personSchema');

// list all persons in database
async function listPersons (req, res) {
	try {
		const persons = await Person.find();
		res.json({ status: 'success', data: persons });
	} catch (err) {
		console.log(error);
		res.status(500).json({ status: 'error', error });
	}
};
		

// adds a new person to database
async function addPerson (req, res) {
	let { name, age, gender, contact } = req.body;
	let newPerson = new Person({ name, age, gender, contact });
	try {
		let tempPerson = await Person.findOne({ contact });
		if (tempPerson) return res.json({ status: 'error', error: 'Contact already used.' }); 
		await newPerson.save();
		res.json({ status: 'success', data: newPerson });
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 'error', error });
	}
};

// edit person's name, age, gender, contact
async function editPerson (req, res) {
	let { name, age, gender, contact } = req.body;
	let { id } = req.params;
	try {
		let tempPerson = await Person.findById(id)
		if (!tempPerson) return res.json({ status: 'error', error: 'Person not found.' });
		if (name) tempPerson.name = name;
		if (age) tempPerson.age = age;
		if (contact) tempPerson.contact = contact;
		if(gender) tempPerson.gender = gender;
		await tempPerson.save();

		res.json({ status: 'success', data: tempPerson });
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 'error', error });
	}	
};

//sets isDeleted attribute of any person to true
async function deletePerson (req, res) {
	try {
		let { id } = req.params;
		let currentPerson = await Person.findById(id)
		if (!currentPerson) return res.json({ status: 'error', error: 'Person not found' });

		//delete person from database
		await currentPerson.delete();
		res.json({ status: 'success' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: 'error', error });
	}
};

module.exports = {
	listPersons,
	addPerson,
	editPerson,
	deletePerson,
};