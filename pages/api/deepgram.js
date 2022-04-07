const { Deepgram } = require("@deepgram/sdk");
const deepgram = new Deepgram(process.env.DEEPGRAM_API_KEY);

export default async function handler(req, res) {
  try {
    const { results } = await deepgram.transcription.preRecorded(
      {
        buffer: Buffer.from(req.body, "base64"),
        mimetype: "audio/wav",
      },
      { punctuate: true, numerals: true }
    );
    res.status(200).json({ body: JSON.stringify(results) });
  } catch (err) {
    res.status(500).json({ body: String(err) });
  }
}
