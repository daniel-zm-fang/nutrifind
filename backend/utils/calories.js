var axios = require('axios').default;
var convert  = require('convert-units')

var ingredient = 'chicken';
var quantity = 200;
var quantity_type = 'grams';
quantity_type = quantity_type.toLowerCase();

async function calories() {
  try{ 
    switch (quantity_type){
      case 'tbsp':
      case 'tablespoon':
      case 'tablespoons':
        quantity_type = 'Tbs';
        quantity *= 12;
        break;
      case 'cups':
        quantity_type = "cup";
        quantity *= 150;
        break;
      case 'tsps':
      case 'teaspoon':
      case 'teaspoons':
        quantity_type = 'tsp';
        quantity *= 4;
        break;
      case 'milliliter':
      case 'millilitre': 
      case 'milliliters': 
      case 'millilitres':
        quantity_type = 'ml';
        break;
      case 'liter':
      case 'litre':
      case 'liters':
      case 'litres':
        quantity_type = 'l';
        quantity *= 900;
        break;
      case 'quart':
      case 'quarts':
      case 'qts':
        quantity_type = 'qt';
        quantity *= 1000;
        break;
      case 'gram':
      case 'grams':
        quantity_type = 'g';
        break;
      case 'milligram': 
      case 'milligrams':
      case 'mgs':
        quantity_type = 'mg';
      case 'kilogram':
      case 'kilograms':
      case 'kgs':
        quantity_type = 'kg';
        break;
      case 'pounds':
      case 'pound':
      case 'lbs':
        quantity_type = 'lb';
        break;
      case 'ounce':
      case 'ounces':
        quantity_type = 'oz';
        break;
      default:
        throw new Exception('Invalid units');
    } 
  } catch (Exception) {
    //send back to front end
  }

  var unit_possibilities = convert(1).from(quantity_type).possibilities();
  if(unit_possibilities.includes('g')){
    convert(1).from(quantity_type).to('g');
  }
  quantity /= 100;




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