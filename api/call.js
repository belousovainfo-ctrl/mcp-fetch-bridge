export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST required" });
  }
  try {
    const { name, arguments: args } = req.body || {};
    if (!name) return res.status(400).json({ error: "Missing tool name" });

    if (name === "http_get") {
      const r = await fetch(args.url, {
        method: "GET",
        redirect: "follow",
        headers: args.headers || {
          "User-Agent": "Mozilla/5.0",
          "Accept-Language": "en-US"
        }
      });
      const body = await r.text();
      return res.status(200).json({
        content: { status: r.status, body: body.slice(0, 20000) }
      });
    }

    if (name === "http_post") {
      const r = await fetch(args.url, {
        method: "POST",
        redirect: "follow",
        headers: args.headers || { "Content-Type": "application/json" },
        body: args.body || ""
      });
      const body = await r.text();
      return res.status(200).json({
        content: { status: r.status, body: body.slice(0, 20000) }
      });
    }

    return res.status(400).json({ error: `Unknown tool: ${name}` });
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}
