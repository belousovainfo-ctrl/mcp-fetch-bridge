export default async function handler(req, res) {
  res.status(200).json({
    tools: [
      {
        name: "http_get",
        description: "HTTP GET request",
        input_schema: {
          type: "object",
          properties: {
            url: { type: "string" },
            headers: { type: "object" }
          },
          required: ["url"]
        }
      },
      {
        name: "http_post",
        description: "HTTP POST request with optional headers and body",
        input_schema: {
          type: "object",
          properties: {
            url: { type: "string" },
            headers: { type: "object" },
            body: { type: "string" }
          },
          required: ["url"]
        }
      }
    ]
  });
}
