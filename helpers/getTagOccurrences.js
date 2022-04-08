export default function getTagOccurrences(tokens) {
  let obj = {};

  tokens.forEach(function (el, i, arr) {
    obj[el.word] = obj[el.word] ? ++obj[el.word] : 1;
  });

  let arr = [];
  for (const el in obj) {
    if (el.length > 2) {
      if (el !== "and" && el !== "the" && el !== "but")
        arr.push({ value: el, count: obj[el] });
    }
  }

  arr.sort((a, b) => a.count - b.count).reverse();
  const res = arr.slice(0, 50);

  return res;
}
