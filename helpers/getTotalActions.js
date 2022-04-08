export default function getTotalActions(doc) {
  const actions = [
    "PastTense",
    // "PerfectTense",
    "Infinitive",
    // "PresentTense",
    "Copula",
    "Modal",
    "Gerund",
    // "FuturePerfect",
    // "Pluperfect",
    // "FuturePerfect",
    // "Activity",
  ];
  const total = 0;
  actions.forEach((action, index) => {
    total += doc.match(`#${action}`).ptrs.length;
  });
  return total;
}
