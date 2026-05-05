export default async function handler(req, res) {

  // 🔥 CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {

    const { term, key } = req.query;

    // 🔐 Front key
    if (key !== "mynk") {
      return res.status(403).json({
        status: false,
        message: "Invalid API Key"
      });
    }

    if (!term) {
      return res.status(400).json({
        status: false,
        message: "Enter phone number"
      });
    }

    // 🔥 Tumhari new API
    const url = `https://users-xinfo-admin-six.vercel.app/api?key=mayankbhaiooo&type=mobile&term=${term}`;

    const r = await fetch(url);
    let data = await r.json();

    // ✅ REMOVE unwanted fields
    delete data.tag;
    delete data.dev_credit;
    delete data.credit;

    // 🔥 Agar andar nested me ho (extra safety)
    if (data.result) {
      delete data.result.tag;
    }

    // 🔥 Final clean response
    return res.status(200).json({
      ...data,
      status: true
    });

  } catch (e) {

    return res.status(500).json({
      status: false,
      message: "API Down",
      error: String(e)
    });

  }
}
