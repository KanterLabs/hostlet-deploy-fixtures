import {existsSync, readFileSync} from "node:fs";

const manifest = JSON.parse(readFileSync("fixtures.json", "utf8"));
if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.fixtures)) throw new Error("invalid fixture manifest");
const ids = new Set();
for (const fixture of manifest.fixtures) {
  if (!/^[a-z0-9-]+$/.test(fixture.id) || ids.has(fixture.id)) throw new Error(`invalid fixture id: ${fixture.id}`);
  ids.add(fixture.id);
  if (!existsSync(fixture.root)) throw new Error(`missing fixture root: ${fixture.root}`);
  if (!Number.isInteger(fixture.port) || fixture.port < 1 || fixture.port > 65535) throw new Error(`invalid port: ${fixture.id}`);
  for (const key of ["healthPath", "probePath"]) {
    if (!fixture[key].startsWith("/")) throw new Error(`invalid ${key}: ${fixture.id}`);
  }
}
console.log(`validated ${ids.size} Hostlet fixtures`);

