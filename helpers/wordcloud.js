export default function getOccurrences(tokens) {
  let obj = {};

  tokens.forEach(function (el, i, arr) {
    obj[el.word] = obj[el.word] ? ++obj[el.word] : 1;
  });

  let arr = [];
  for (const el in obj) {
    if (el.length > 2) {
      arr.push({ value: el, count: obj[el] });
    }
  }

  return arr;
}
