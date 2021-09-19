var axios = require('axios').default;
var convert  = require('convert-units')

var ingredient = 'butter';
var quantity = 3;
var quantity_type = 'tsp';
quantity_type = quantity_type.toLowerCase();

async function calories() {
  try{ 
    switch (quantity_type){
      case 'tbsp':
      case 'tablespoon':
      case 'tablespoons':
      case 'Tbs':
        quantity_type = 'Tbs';
        quantity *= 12;
        break;
      case 'cups':
      case 'cup':
        quantity_type = "cup";
        quantity *= 150;
        break;
      case 'tsps':
      case 'teaspoon':
      case 'teaspoons':
      case 'tsp':
        quantity_type = 'tsp';
        quantity *= 4;
        break;
      case 'milliliter':
      case 'millilitre': 
      case 'milliliters': 
      case 'millilitres':
      case 'ml':
        quantity_type = 'ml';
        break;
      case 'liter':
      case 'litre':
      case 'liters':
      case 'litres':
      case 'l':
        quantity_type = 'l';
        quantity *= 900;
        break;
      case 'quart':
      case 'quarts':
      case 'qts':
      case 'qt':
        quantity_type = 'qt';
        quantity *= 1000;
        break;
      case 'gram':
      case 'grams':
      case 'g':
        quantity_type = 'g';
        break;
      case 'milligram': 
      case 'milligrams':
      case 'mgs':
      case 'mg':
        quantity_type = 'mg';
      case 'kilogram':
      case 'kilograms':
      case 'kgs':
      case 'kg':
        quantity_type = 'kg';
        break;
      case 'pounds':
      case 'pound':
      case 'lbs':
      case 'lb':
        quantity_type = 'lb';
        break;
      case 'ounce':
      case 'ounces':
      case 'oz':
        quantity_type = 'oz';
        break;
      default:
        throw new Exception('Invalid units');
    } 
  } catch (Exception) {
    quantity = 0;
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

calories().then((res) => {
  console.log(res);
})

module.exports = calories;