const fs = require("node:fs");
const http = require("node:http");

const port = Number(process.env.PORT || 3000);
const marker = "hostlet-fixture-node-v2";
const dataDir = process.env.HOSTLET_DATA_DIR || "/data";

http.createServer((request, response) => {
  response.writeHead(200, {"content-type": "text/plain"});
  if (request.url === "/health") return response.end("ok");
  let persisted = "unavailable";
  try {
    fs.mkdirSync(dataDir, {recursive: true});
    const path = `${dataDir}/fixture-marker`;
    if (!fs.existsSync(path)) fs.writeFileSync(path, "persisted-v1");
    persisted = fs.readFileSync(path, "utf8");
  } catch {}
  response.end(`${marker}:${persisted}`);
}).listen(port, "0.0.0.0");
