import {mkdir, writeFile} from "node:fs/promises";

const websocketUrl = process.env.VITE_WS_URL || "missing";
await mkdir("dist", {recursive: true});
await writeFile("dist/index.html", `<!doctype html><h1>hostlet-fixture-topology</h1><p>${websocketUrl}</p>`);

