const nutritionRouter = require('express').Router();
const calories = require('../utils/calories');
/*

Anything related to routes for the nutrition route
should go here! Be it sending data back to the caller
or guiding the caller somewhere.
*/

// Example GET route (using localhost:3000/api/nutrition)
// Async Programming is important here!
nutritionRouter.get('/', async (request, response) => {
    response.json({ message: await calories() });
});

// TODO: Implement route to return JSON with
//       calories, price, stuff like that

module.exports = nutritionRouter;