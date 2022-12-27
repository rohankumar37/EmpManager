require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
var morgan = require('morgan');
var cors = require('cors');

//---------- CONNECT TO MONGO DB ---------
let mongoLink = process.env.MONGOURL;
try {
	mongoose
		.connect(mongoLink, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
		.then(() => console.log('Connected to MongoDB.'));
} catch (err) {
	console.log(err);
}

//---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
// cors

app.use(morgan('dev'));

//---------- ROUTES ----------
const personRouter = require('./routes/personRouter.js');

app.get('/ping', (req, res) => {
	res.send('pong');
});

app.use('/person', personRouter);

//---------- MISC ----------
app.listen(process.env.PORT || 5000, () => {
	console.log('Backend Server is listening on port ' + (process.env.PORT || 5000));
});
