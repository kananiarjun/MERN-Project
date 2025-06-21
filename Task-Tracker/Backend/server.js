const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://15110422019:12345@cluster0.kgac7ka.mongodb.net/');

app.use('/api/tasks', require('./routes/tasks'));

app.listen(5000, () => console.log('Server running on port 5000'));