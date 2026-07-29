const port = Number(Bun.env.PORT || 3000);

Bun.serve({
  hostname: "0.0.0.0",
  port,
  fetch(request) {
    const path = new URL(request.url).pathname;
    return new Response(path === "/health" ? "ok" : "hostlet-fixture-bun");
  },
});

