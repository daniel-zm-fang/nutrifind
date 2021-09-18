const express = require('express');
const config = require('./utils/config');

const app = express();
const nutritionRouter = require('./controllers/nutritition');
const nlpRouter = require('./controllers/nlp');

app.use(express.static('build'));
app.use(express.json());

app.use('/api/nutrition', nutritionRouter);
app.use('/api/nlp', nlpRouter);


module.exports = app;