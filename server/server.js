const express = require('express')
const mongoose = require('./models/db');

const app = express()

const port = 6868;


// check database connection status
mongoose.connection.once('open', () => {
    console.log('MongoDB connection successful');
}).on('error', (err) => {
    console.error('MongoDB connection error:', err);
});


//Routers
app.get('/', (req, res) =>{
    return res.send('Hello, You\'ve reached your APP!');
});

app.listen(port, () => console.log(`APP listening on port ${port}!`));

