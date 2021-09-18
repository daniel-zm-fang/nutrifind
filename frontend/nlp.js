nlp.extend(compromiseNumbers);

function listIsIngredient(listStr) {
  let doc = nlp(listStr);
  let nouns = doc.nouns().out('array');
  console.log(nouns);
}
