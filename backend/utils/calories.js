var axios = require('axios').default;
var convert  = require('convert-units')

async function quantityHelper(quantity, quantityType) {
  quantityType = quantityType.toLowerCase();
  try{ 
    switch (quantityType){
      case 'tbsp':
      case 'tablespoon':
      case 'tablespoons':
        quantityType = 'Tbs';
        quantity *= 12;
        break;
      case 'cups':
        quantityType = "cup";
        quantity *= 150;
        break;
      case 'tsps':
      case 'teaspoon':
      case 'teaspoons':
        quantityType = 'tsp';
        quantity *= 4;
        break;
      case 'milliliter':
      case 'millilitre': 
      case 'milliliters': 
      case 'millilitres':
        quantityType = 'ml';
        break;
      case 'liter':
      case 'litre':
      case 'liters':
      case 'litres':
        quantityType = 'l';
        quantity *= 900;
        break;
      case 'quart':
      case 'quarts':
      case 'qts':
        quantityType = 'qt';
        quantity *= 1000;
        break;
      case 'gram':
      case 'grams':
        quantityType = 'g';
        break;
      case 'milligram': 
      case 'milligrams':
      case 'mgs':
        quantityType = 'mg';
      case 'kilogram':
      case 'kilograms':
      case 'kgs':
        quantityType = 'kg';
        break;
      case 'pounds':
      case 'pound':
      case 'lbs':
        quantityType = 'lb';
        break;
      case 'ounce':
      case 'ounces':
        quantityType = 'oz';
        break;
      default:
        throw new Exception('Invalid units');
    }
    return { quantity, quantityType }
  } catch (Exception) {
    return null;
  }
}

async function calories(ingredient, quantity, quantityType) {
  let temp = { quantity, quantityType };
  temp = quantityHelper()

  var unit_possibilities = convert(1).from(quantityType).possibilities();
  if(unit_possibilities.includes('g')){
    convert(1).from(quantityType).to('g');
  }
  quantity /= 100;

asdfasdfasdfasdffff


  var options = {
    method: 'GET',
    url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
    params: {query: ingredient},
    headers: {
      'x-rapidapi-host': 'calorieninjas.p.rapidapi.com',
      'x-rapidapi-key': 'b70c9617f3mshce65036542e8cfap1a8cc9jsndbb1c4f8c779'
    }
  };



  const returnValue = await axios.request(options);
  return returnValue.data.items[0].calories * quantity;

}

module.exports = calories;