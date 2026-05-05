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

    const r = await fetch(`https://users-xinfo-admin-six.vercel.app/api?key=mayankbhaiooo&type=mobile&term=${term}`);
    let data = await r.json();

    // 🧹 REMOVE EVERYTHING EXTRA
    delete data.tag;
    delete data.credit;
    delete data.dev_credit;
    delete data.BUY_API;
    delete data.SUPPORT;

    if (data.result) {
      delete data.result.tag;
    }

    // ❗ IMPORTANT: ONLY RETURN DATA (NO SPREAD + NO EXTRA)
    return res.json(data);

  } catch (e) {
    return res.json({
      status: false,
      message: "API Down"
    });
  }
}
