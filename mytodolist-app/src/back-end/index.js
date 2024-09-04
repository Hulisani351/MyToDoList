const express = require('express');
const mongoose = require('mongoose');
const app = express();
const MyList = require('./models/MyList.model.js');

// Use express.json() to parse JSON bodies
app.use(express.json());

// POST endpoint to create a new list item
app.post('/api', async (req, res) => {
    try {
        const list = await MyList.create(req.body); // Await the async function
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET endpoint for the root path
app.get('/', (req, res) => {
    res.send("Hello from the world");
});

// Connect to MongoDB and start the server
mongoose.connect('mongodb+srv://2627971:k5e6fbsABw6fanyo@cluster0.kijv2.mongodb.net/Mytodolist?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB!');
        app.listen(3000, () => {
            console.log("Server listening on port 3000");
        });
    })
    .catch(error => {
        console.error('Connection error:', error.message);
    });
