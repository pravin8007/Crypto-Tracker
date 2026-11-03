import process from "node:process";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (typeof id !== "string" || !/^[a-z0-9-]+$/i.test(id)) {
    return res.status(400).json({ error: "Invalid coin ID" });
  }

  try {
    const headers = {};

    if (process.env.COINGECKO_API_KEY) {
      headers["x-cg-demo-api-key"] = process.env.COINGECKO_API_KEY;
    }

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}`,
      { headers }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "CoinGecko API request failed",
      });
    }

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return res.status(200).json(data);
  } catch (error) {
    console.error("Coin details error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
