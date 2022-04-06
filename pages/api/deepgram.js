const { Deepgram } = require("@deepgram/sdk");
const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY);

export default async function handler(req, res) {
  //   console.log(req);
  //   res.status(200).json({ name: "John Doe" });
  try {
    const { results } = await deepgram.transcription.preRecorded({
      buffer: Buffer.from(event.body, "base64"),
      mimetype: "audio/wav",
    });
    return { statusCode: 200, body: JSON.stringify(results) };
  } catch (err) {
    return { statusCode: 500, body: String(err) };
  }
}
