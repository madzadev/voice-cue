const { Deepgram } = require("@deepgram/sdk");
const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY);

export default async function handler(req, res) {
  try {
    const { results } = await deepgram.transcription.preRecorded({
      buffer: Buffer.from(req.body, "base64"),
      mimetype: "audio/wav",
    });
    res.status(200).json({ statusCode: 200, body: JSON.stringify(results) });
  } catch (err) {
    res.status(500).json({ statusCode: 500, body: String(err) });
  }
}
