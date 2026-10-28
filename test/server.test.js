const { test } = require("node:test");
const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");

test("CloudOps Dashboard health endpoint", async (t) => {
  const port = 3301;

  const app = spawn("node", ["server.js"], {
    env: {
      ...process.env,
      PORT: String(port),
      APP_ENV: "test",
    },
    stdio: "ignore",
  });

  t.after(() => {
    app.kill("SIGTERM");
  });

  let response;

  for (let i = 0; i < 30; i++) {
    try {
      response = await fetch(`http://127.0.0.1:${port}/health`);
      break;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  assert.ok(response, "Application did not start");
  assert.equal(response.status, 200);

  const body = await response.json();

  assert.equal(body.status, "ok");
  assert.equal(body.application, "CloudOps Dashboard");
  assert.equal(body.environment, "test");
});
