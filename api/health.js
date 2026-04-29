export default function handler(req, res) {
  return res.status(200).json({
    status: "ok",
    service: "seo-agent-stanza-api",
    message: "API online"
  });
}
