import process from "node:process";

const apiKey = process.env.COINGECKO_API_KEY;


export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const { id, days: requestedDays = "30" } = req.query || {};
  const days = String(Array.isArray(requestedDays) ? requestedDays[0] : requestedDays);

  const allowedDays = ["7", "30", "60", "90", "120", "365"];

  if (
    typeof id !== "string" ||
    !/^[a-z0-9-]+$/i.test(id) ||
    !allowedDays.includes(days)
  ) {
    return res.status(400).json({
      error: "Invalid parameters",
    });
  }

  const url = new URL(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart`
  );

  url.searchParams.set("vs_currency", "usd");
  url.searchParams.set("days", days);

  try {
    const headers = {};

    if (apiKey) {
      headers["x-cg-demo-api-key"] =
        apiKey;
    }

    const response = await fetch(url, { headers });
    const data = await response.json();

    if (!response.ok) {
      console.error("CoinGecko market chart error:", response.status, data);
      return res.status(response.status).json({
        error: data?.error || data?.status?.error_message || "CoinGecko API request failed",
      });
    }

    if (
      !data ||
      !Array.isArray(data.prices) ||
      !Array.isArray(data.market_caps) ||
      !Array.isArray(data.total_volumes)
    ) {
      return res.status(502).json({
        error: "Invalid market chart response",
      });
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return res.status(200).json(data);

  } catch (error) {
    console.error("Market data error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
