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
      `https://num-tg-info-api.vercel.app/info?number=${term}`
    );

    const data = await r.json();

    // 🔥 ORIGINAL RESULTS
    const results = data.results || [];

    // 🔥 FORMAT FIX
    const formatted = results.map((item) => ({
      id: item.id || "",
      mobile: item.mobile || "",
      name: item.name || "",
      father_name: item.fname || "",
      address: item.address || "",
      alt_mobile: item.alt || "",
      circle: item.circle || "",
      id_number: item.id || "",
      email: item.email || ""
    }));

    // 🔥 FINAL RESPONSE (NO CREDIT)
    return res.json({
      success: true,
      result: formatted
    });

  } catch (e) {

    return res.json({
      success: false,
      message: "API Down",
      error: e.message
    });

  }

}
