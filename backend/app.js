const express = require('express');
const cors = require('cors');
const config = require('./utils/config');

const app = express();
const nlpRouter = require('./controllers/nlp');
const nutritionRouter = require('./controllers/nutrition');

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/api/nutrition', nutritionRouter);
app.use('/api/nlp', nlpRouter);


module.exports = app;