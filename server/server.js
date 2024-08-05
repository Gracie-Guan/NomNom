const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./models/db'); 
const cors = require('cors');
// const Menu = mongoose.model('menu', restaurantSchema);
const Menu = require('./models/MenuModel');
const DishModel = require('./models/DishModel'); // Import the Dish model

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

// app.post('/add-menu', async (req, res) => {
//     try {
//         // const collection = "dishes"
        
//         console.log("request: ", req);
//         const newData = req.body;
//         console.log("newData via /add-menu: ", newData);
//         console.log("Dish: ", DishModel);
//         const result = await DishModel.insertMany(newData);
//         res.json(result);
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// });

app.listen(port, () => console.log(`APP listening on port ${port}!`));
