const nutritionRouter = require('express').Router();
const calories = require('../utils/calories');
const prices = require('../utils/prices');
/*

Anything related to routes for the nutrition route
should go here! Be it sending data back to the caller
or guiding the caller somewhere.
*/

// GET route for caloric count
nutritionRouter.get('/', async (request, response) => {
    response.json({ message: await calories() });
});

// GET route for price information
nutritionRouter.get('/prices', async (request, response) => {
    const { ingredient } = request.body;
    response.json({ ingredient: await prices(ingredient)});
});

module.exports = nutritionRouter;