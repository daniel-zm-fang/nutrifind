function quantityHelper(quantity, quantityType) {
  if (!quantity || !quantityType) {
    console.log('invalid quantity', quantity, quantityType);
    return null;
  }
  quantityType.toLowerCase();
  try {
    switch (quantityType) {
      case 'tbsp':
      case 'tablespoon':
      case 'tablespoons':
        quantityType = 'Tbs';
        quantity *= 12;
        break;
      case 'cups':
        quantityType = "g";
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
        throw 'Invalid units';
    }
    return { quantity, quantityType }
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = quantityHelper;