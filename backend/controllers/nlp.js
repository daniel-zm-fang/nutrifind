const nlpRouter = require('express').Router();
const fs = require('fs')
const nlp = require('compromise');
nlp.extend(require('compromise-numbers'));
const quantityHelper = require('../utils/quantity');
const price = require('../utils/price')
const calories = require('../utils/calories')

// read food related words
const data = fs.readFileSync('./data/food.csv').toLocaleString()
const allFoodWords = data.split(',').map((s) => s.slice(1, -1))

// `"","peach","eggplant","burrata","roe","Beans","mahimahi","samphire","conch","pro.activ","pigeon","ajwain","Flour","pitas","petrale","tonkatsu","fire","Cuisine","ORIGINALS","fishcake","Veri","steamed","dende","crystallized","mary","hanger","brewed","prune","lump","barramundi","aminos","hatcho","kashmiri","shell-on","wagon","dip","5","Maggi","ketjap","sichuanese","pearls","bok","prunes","Ham","fruit","chunky","roti","winter","cheeks","Tyson","mozarella","cascabel","fillets","hachiya","hyssop","soft","uncook","rabe","leaf","demi",

function toFood(nouns) {
  return nouns.filter((noun) => {
    return allFoodWords.indexOf(noun) > -1
  })
}

function isIngredient(li) {
  const liData = {};
  
  const words = li.split(' ');
  const nums = nlp(li).numbers().json();
  
  // check if item contains numbers
  if (nums.length == 0) {
    console.log(li, 'has no nums:', nums);
    return null;
  } else {
    liData.quantity = nums[0].number;
  }

  // check if theres a quantity
  let found = false;
  for (const word of words) {
    ({ quantity, quantityType } = quantityHelper(liData.quantity, word));
    if (quantity && quantityType) {
      liData.quantity = quantity;
      liData.quantityType = quantityType;
      found = true;
      li = li.replace(word, '');
      break;
    }
  }
  if (!found) {
    console.log(li, 'has no quantity');
    return null;
  }

  const nouns = nlp(li).nouns().out('array');
  // check if its nouns are ingredients
  const foodNouns = toFood(nouns);
  if (foodNouns && foodNouns.length) {
    liData.ingredient = foodNouns.join(' ');
  } else {
    console.log(li, 'has no ingredient nouns:', nouns);
    return null;
  }

  return liData;
}

function findIngredients(uls) {
  for (const ul of uls) {
    const ingredientsList = [];
    for (const li of ul) {
      const liData = isIngredient(li);
      if (liData) {
        ingredientsList.push(liData);
      }
    }
    if (ingredientsList && ingredientsList.length) {
      return ingredientsList;
    }
  }
  return null;
}

nlpRouter.get('/isFood', async (request, response) => {
  console.log(request)
  response.json({ message: "You have successfuly gett'ed", data: toFood(request.body.nouns) });
});

nlpRouter.post('/', async (request, response) => {
  const uls = request.body; // array of string
  const ingredientsList = findIngredients(uls);
  console.log('found ingredients');
  if (ingredientsList && ingredientsList.length) {
    for (let i = 0; i < ingredientsList.length; i += 1) {
      ingredientsList[i].price = await price(ingredientsList[i].ingredient);
      ingredientsList[i].calories = await calories(ingredientsList[i]);
      console.log('getting ingredient', i);
    }
  }
  response.json(ingredientsList);
});

// TODO: Implement route to return JSON with
//       calories, price, stuff like that

// testing

module.exports = nlpRouter;