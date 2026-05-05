export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const { term, key } = req.query;

    if (key !== "mynk") {
      return res.json({ status: false, message: "Invalid Key" });
    }

    if (!term) {
      return res.json({ status: false, message: "Enter number" });
    }

    const r = await fetch(`https://num-api-yie6.vercel.app/?number=${term}`);
    let data = await r.json();

    // 🔥 REMOVE TAG COMPLETELY
    delete data.tag;

    // (extra safety – agar andar ho)
    if (data.result && data.result.tag) {
      delete data.result.tag;
    }

    return res.json(data);

  } catch (e) {
    return res.json({
      status: false,
      message: "API Down"
    });
  }
}
