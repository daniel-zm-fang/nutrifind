nlp.extend(compromiseNumbers);

function listIsIngredient(listStr) {
    let doc = nlp(listStr);
    let nouns = doc.nouns().out('array');
}
let doc = nlp('3 apples');
console.log(doc.numbers().out('array'));
console.log('sanity');