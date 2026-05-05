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

    // 🔥 ONLY TAG CHANGE
    if (data.tag) {
      data.tag = "@mynk";
    }

    return res.json(data);

  } catch (e) {
    return res.json({
      status: false,
      message: "API Down"
    });
  }
}
