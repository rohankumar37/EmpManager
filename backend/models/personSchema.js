var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
			default: 0,
		},
		gender: {
			type: String,
			enum:['m','f','o'],
			required: true,
			default: 'male',
		},
		contact: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Person', PersonSchema);
