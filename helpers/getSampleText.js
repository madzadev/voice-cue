export default function getSampleText(arr, index) {
  let str = "";
  if (index < arr.length - 6) {
    for (let i = index; i < index + 5; i++) {
      str += arr[i].punctuated_word + " ";
    }
    str += "...";
  } else {
    for (let i = index; i < arr.length; i++) {
      str += arr[i].punctuated_word + " ";
    }
  }
  return str;
}
