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

    // 🔥 NEW API CALL
    const r = await fetch(
      `https://num-tg-info-api.vercel.app/info?number=${term}`
    );

    const data = await r.json();

    // 🔥 RESULT ARRAY FIX
    const results = Array.isArray(data.result)
      ? data.result
      : data.data || [data];

    // 🔥 KEY MAPPING
    const formatted = results.map((item) => ({
      id: item.id || null,
      mobile: item.mobile || item.MOBILE || "",
      name: item.name || item.NAME || "",
      father_name: item.father_name || item.fname || "",
      address: item.address || item.ADDRESS || "",
      alt_mobile: item.alt_mobile || item.alt || "",
      circle: item.circle || "",
      id_number: item.id_number || item.id || "",
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
      error: e.message,
      credit: "@mynk_mynk_mynk"
    });

  }

}
