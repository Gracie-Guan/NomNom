const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./models/db'); 
const cors = require('cors');

const app = express();
const port = 6868;

app.use(cors());

// Check database connection status
mongoose.connection.once('open', () => {
    console.log('MongoDB connection successful');
}).on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

//Routers
app.get('/', (req, res) =>{
    return res.send('Hello, You\'ve reached your APP!');
});

const restaurantRouter = require('./routes/Restaurants');
app.use("/restaurants", restaurantRouter);

const menuRouter = require('./routes/Menus');
app.use("/menus", menuRouter);

app.use(bodyParser.json());
const dishRouter = require('./routes/Dishes');
app.use("/dishes", dishRouter);

app.listen(port, () => console.log(`APP listening on port ${port}!`));
