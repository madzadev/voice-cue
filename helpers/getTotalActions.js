import { actions } from "../data/actions";

export default function getTotalActions(doc) {
  let total = 0;
  actions.forEach((action, index) => {
    total += doc.match(`#${action}`).ptrs.length;
  });
  return total;
}
