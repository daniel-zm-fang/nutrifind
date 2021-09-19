var axios = require('axios').default;
var convert  = require('convert-units')
var quantityHelper = require('./quantity');

async function calories({ ingredient, quantity, quantityType }) {
  ({ quantity, quantityType } = quantityHelper(quantity, quantityType));

  var unit_possibilities = convert(1).from(quantityType).possibilities();
  if(unit_possibilities.includes('g')){
    convert(1).from(quantityType).to('g');
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