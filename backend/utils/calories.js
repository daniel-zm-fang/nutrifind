var axios = require('axios').default;
var quantityHelper = require('./quantity');

async function calories({ ingredient, quantity, quantityType }) {
  const data = quantityHelper(quantity, quantityType);
  var options = {
    method: 'GET',
    url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
    params: { query: ingredient },
    headers: {
      'x-rapidapi-host': 'calorieninjas.p.rapidapi.com',
      'x-rapidapi-key': 'b70c9617f3mshce65036542e8cfap1a8cc9jsndbb1c4f8c779',
    },
  };

  const returnValue = await axios.request(options);
  if (returnValue.data.items && returnValue.data.items.length) {
    return returnValue.data.items[0].calories * data.quantity;
  }
  return 0;
}

// calories().then((res) => {
//   console.log(res);
// });

module.exports = calories;
