import Peaks from "peaks.js";

const options = {
  zoomview: {
    container: document.getElementById("zoomview-container"),
  },
  overview: {
    container: document.getElementById("overview-container"),
  },
  mediaElement: document.querySelector("audio"),
  webAudio: {
    audioContext: new AudioContext(),
  },
};

function WaveForm() {
  console.log(1212);
  return (
    <>
      <div id="zoomview-container" />
      <div id="overview-container"/>
    <audio>
      <source src="sample.mp3" type="audio/mpeg">
      <source src="sample.ogg" type='audio/ogg codecs="vorbis"'>
    </audio>
    </>
  );
}

export default WaveForm;
