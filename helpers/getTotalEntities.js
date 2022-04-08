export default function getTotalEntities(doc) {
  const entities = [
    "Person",
    "Place",
    "Organization",
    "Money",
    "Unit",
    // "NumericValue",
    // "Url",
    // "Email",
    // "PhoneNumber",
    "Date",
    // "Hashtag",
  ];
  const total = 0;
  entities.forEach((entity, index) => {
    total += doc.match(`#${entity}`).ptrs.length;
  });
  return total;
}
