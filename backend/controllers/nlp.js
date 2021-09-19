const nlpRouter = require('express').Router();
const fs = require('fs')
const nlp = require('compromise');
nlp.extend(require('compromise-numbers'));

const data = fs.readFileSync('./data/food-related.csv').toLocaleString()
const allFoodWords = data.split('\r\n')
const tempWords = allFoodWords.map((word) => {
    return word.slice(1, -1)
})

function toFood(nouns) {
    return nouns.filter((noun) => {
        return tempWords.indexOf(noun) > -1
    })
}

/*
async function findIngredient(uls) {
  for (const ul of uls) {
    const ingredientsList = [];
    let broken = false;
    for (const li of ul) {
      const ingredient = {};
      const doc = nlp(li);
      const nums = doc.numbers().json();
      if (nums.length === 0) {
        broken = true;
        break;
      } else {
        ingredient.quantity = nums[0].number;
      }
      const nouns = doc.nouns().out('array');
      const foodNouns = await axios.get('localhost:3000/api/nlp', {
        params: { nouns }
      });
      if (foodNouns && foodNouns.length) {
        ingredient.ingredient = foodNouns.join(' ');
      } else {
        broken = true;
        break;
      }
      
    }
  }
}
*/

nlpRouter.get('/isFood', async (request, response) => {
    response.json({ message: "You have successfuly gett'ed", data: toFood(nouns) });
});

nlpRouter.post('/isFood', async (request, response) => {

    const nouns = request.body.nouns; // array of string
    console.log(request.body)
    response.json({ message: "You have successfuly gett'ed", data: toFood(nouns) });
});

// TODO: Implement route to return JSON with
//       calories, price, stuff like that

module.exports = nlpRouter;