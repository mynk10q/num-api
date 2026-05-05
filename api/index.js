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

    // 🔥 API call
    const r = await fetch(`https://users-xinfo-admin-six.vercel.app/api?key=mayankbhaiooo&type=mobile&term=${term}`);
    let data = await r.json();

    // 🧹 REMOVE ALL USELESS TAGS / BRANDING
    delete data.tag;
    delete data.credit;
    delete data.dev_credit;
    delete data.BUY_API;
    delete data.SUPPORT;

    if (data.result) {
      delete data.result.tag;
    }

    // 🔥 ONLY CLEAN RESPONSE RETURN
    return res.json(data);

  } catch (e) {
    return res.json({
      status: false,
      message: "API Down"
    });
  }
}
