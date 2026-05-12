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

    // 🔥 RETRY FUNCTION
    async function fetchWithRetry(url, retries = 5) {

      for (let i = 0; i < retries; i++) {

        try {

          const controller = new AbortController();

          const timeout = setTimeout(() => {
            controller.abort();
          }, 10000);

          const response = await fetch(url, {
            signal: controller.signal,
            headers: {
              "User-Agent": "Mozilla/5.0"
            }
          });

          clearTimeout(timeout);

          const data = await response.json();

          // 🔥 DATA MIL GYA
          if (data?.results?.length > 0) {
            return data;
          }

        } catch (err) {
          console.log(`Retry ${i + 1} Failed`);
        }

      }

      return null;
    }

    // 🔥 API CALL WITH RETRY
    const data = await fetchWithRetry(
      `https://num-tg-info-api.vercel.app/info?number=${term}`
    );

    if (!data) {
      return res.json({
        success: false,
        message: "No Data Found / API Slow"
      });
    }

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

    // 🔥 FINAL RESPONSE
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
