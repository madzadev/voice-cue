import { entities } from "../data/entities";

export default function getTotalEntities(doc) {
  let total = 0;
  entities.forEach((entity, index) => {
    total += doc.match(`#${entity}`).ptrs.length;
  });
  return total;
}
