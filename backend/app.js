const express = require('express');
const config = require('./utils/config');

const app = express();
const nutritionRouter = require('./controllers/nutritition');

app.use(express.static('build'));
app.use(express.json());

app.use('/api/nutrition', nutritionRouter);


module.exports = app;