export default function getThousandFormat(num) {
  if (num > 999) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
}
