export default function getTotalSpeakers(arr) {
  let speakerCount = 0;
  arr.forEach((word, index) => {
    if (word.speaker > speakerCount) {
      ++speakerCount;
    }
  });
  return speakerCount + 1;
}
