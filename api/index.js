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

    // 🔥 Direct API call
    const r = await fetch(`https://users-xinfo-admin-six.vercel.app/api?key=mayankbhaiooo&type=mobile&term=${term}`);
    
    let data = await r.json();

    // 🔥 ONLY THIS LINE ADD
    delete data.tag;

    // (extra safety agar nested ho)
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
