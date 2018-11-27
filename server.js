const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

const User = require('./models/User');

//Body Parser

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//connect to mongoose



// mongoose
// .connect(db)
// .then(() => console.log(err));

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/developer-connect', { useNewUrlParser: true }).then((db)=>{
	console.log('MongoDB connected');
}).catch(error=> console.log("error"));



// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// routes 

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);



app.get('/', (req, res) => res.send('hello people'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server is running'));