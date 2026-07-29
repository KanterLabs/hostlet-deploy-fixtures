const http = require("node:http");
const {Client} = require("pg");
const {createClient} = require("redis");

const port = Number(process.env.PORT || 3000);

async function postgresProbe() {
  if (!process.env.DATABASE_URL) return "postgres-missing";
  const client = new Client({connectionString: process.env.DATABASE_URL});
  await client.connect();
  await client.query("CREATE TABLE IF NOT EXISTS hostlet_cert (id integer primary key, value text not null)");
  await client.query("INSERT INTO hostlet_cert(id,value) VALUES (1,'persisted') ON CONFLICT (id) DO NOTHING");
  const result = await client.query("SELECT value FROM hostlet_cert WHERE id=1");
  await client.end();
  return result.rows[0]?.value === "persisted" ? "postgres-ok" : "postgres-bad";
}

async function redisProbe() {
  if (!process.env.REDIS_URL) return "redis-missing";
  const client = createClient({url: process.env.REDIS_URL});
  await client.connect();
  await client.set("hostlet-cert", "persisted");
  const value = await client.get("hostlet-cert");
  await client.quit();
  return value === "persisted" ? "redis-ok" : "redis-bad";
}

http.createServer(async (request, response) => {
  response.writeHead(200, {"content-type": "text/plain"});
  try {
    if (request.url === "/health") return response.end("ok");
    if (request.url === "/postgres") return response.end(await postgresProbe());
    if (request.url === "/redis") return response.end(await redisProbe());
    response.end("hostlet-fixture-managed-services");
  } catch (error) {
    response.statusCode = 500;
    response.end(`probe-failed:${error.name}`);
  }
}).listen(port, "0.0.0.0");

