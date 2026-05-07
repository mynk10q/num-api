export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");

  try {

    const { term, key } = req.query;

    if (key !== "lodalasan") {
      return res.json({
        success: false,
        message: "Invalid Key"
      });
    }

    if (!term) {
      return res.json({
        success: false,
        message: "Enter Number"
      });
    }

    // 🔥 API CALL
    const r = await fetch(
      `https://users-xinfo-admin-six.vercel.app/api?key=mayankbhaiooo&type=mobile&term=${term}`
    );

    const data = await r.json();

    // 🔥 RESULT ARRAY
    const results = data.result?.data || data.result || [];

    // 🔥 KEY MAPPING
    const formatted = results.map((item) => ({
      id: item.id || null,
      mobile: item.MOBILE || item.mobile || "",
      name: item.NAME || item.name || "",
      father_name: item.fname || item.father_name || "",
      address: item.ADDRESS || item.address || "",
      alt_mobile: item.alt || item.alt_mobile || "",
      circle: item.circle || "",
      id_number: item.id || item.id_number || "",
      email: item.email || ""
    }));

    // 🔥 FINAL RESPONSE
    return res.json({
      success: true,
      result: formatted,
      credit: "@mynk_mynk_mynk"
    });

  } catch (e) {

    return res.json({
      success: false,
      message: "API Down",
      credit: "@mynk_mynk_mynk"
    });

  }

}
