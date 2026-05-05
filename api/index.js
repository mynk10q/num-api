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

    // 🔥 First API
    let r = await fetch(`https://users-xinfo-admin-six.vercel.app/api?key=mayankbhaiooo&type=mobile&term=${term}`);
    let data = await r.json();

    // ❌ agar empty aaye
    if (!data.data || Object.keys(data.data).length === 0) {

      // 🔁 fallback API (old working)
      let r2 = await fetch(`https://www.zephrexdigital.site/api?key=MAYAN-BHAI&type=PHONE&term=${term}`);
      data = await r2.json();
    }

    // 🧹 clean
    delete data.tag;
    delete data.credit;
    delete data.dev_credit;

    return res.json({
      status: true,
      ...data
    });

  } catch (e) {
    return res.json({ status: false, error: String(e) });
  }
}
