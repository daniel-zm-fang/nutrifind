const axios = require('axios')
const nlp = require('compromise');
nlp.extend(require('compromise-numbers'));

function getFoods() {
  const records = parse()
}

function findIngredient(uls) {
  for (const ul of uls) {
    const filteredUl = {};
    let broken = false;
    for (const li of ul) {
      const filteredLi = {};
      const doc = nlp(li);
      const nums = doc.numbers().json();
      if (nums.length === 0) {
        broken = true;
        break;
      } else {
        filteredLi.nums = nums[0].number;
      }
      const nouns = doc.nouns().out('array');
      
    }
  }
}

function onlyNouns() {
  const fr = new FileReader();
  fr.onload = () => {
    document.get
  }
}

let doc = nlp('three 20');
console.log(doc.numbers().out('array'));

module.exports = {
  findIngredient,

}