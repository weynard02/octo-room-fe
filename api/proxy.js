export default async function handler(req, res) {
  const backendUrl = process.env.VITE_API_BASE_URL;
  
  if (!backendUrl) {
    return res.status(500).json({ error: "VITE_API_BASE_URL is not defined in environment variables." });
  }

  // Extract the path from the URL
  const path = req.url.replace(/^\/api/, "");
  const targetUrl = `${backendUrl.replace(/\/$/, "")}${path}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: new URL(backendUrl).host,
      },
      body: req.method !== "GET" && req.method !== "HEAD" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to proxy request." });
  }
}
