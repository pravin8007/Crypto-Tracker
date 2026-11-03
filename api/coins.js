import process from "node:process";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const headers = {};

    if (process.env.COINGECKO_API_KEY) {
      headers["x-cg-demo-api-key"] = process.env.COINGECKO_API_KEY;
    }

    const url = new URL(
      "https://api.coingecko.com/api/v3/coins/markets"
    );

    url.searchParams.set("vs_currency", "usd");
    url.searchParams.set("order", "market_cap_desc");
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", "1");
    url.searchParams.set("sparkline", "false");

    const response = await fetch(url, { headers });
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "CoinGecko API request failed",
      });
    }

    if (!Array.isArray(data)) {
      return res.status(502).json({
        error: "Invalid coins response",
      });
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return res.status(200).json(data);
  } catch (error) {
    console.error("Coins API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
