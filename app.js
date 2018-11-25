const express = require('express');
const mongoose = require('mongoose');

const app = express();

//connect to mongoose

const db = require('./config/keys').mongoURI;

// mongoose
// .connect(db)
// .then(() => console.log(err));

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://vishnu:vishnu1@ds115874.mlab.com:15874/developer-connect', { useNewUrlParser: true }).then((db)=>{
	console.log('MongoDB connected');
}).catch(error=> console.log("error"));



// routes 

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);



app.get('/', (req, res) => res.send('hello people'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Server is running'));