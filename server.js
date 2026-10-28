const http = require("http");

const PORT = process.env.PORT || 3000;
const ENV = process.env.APP_ENV || "development";

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });

    return res.end(
      JSON.stringify({
        status: "ok",
        application: "CloudOps Dashboard",
        environment: ENV,
      })
    );
  }

  if (req.url !== "/") {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Not Found" }));
  }

  res.writeHead(200, { "Content-Type": "text/html" });

  res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <title>CloudOps Dashboard</title>

      <style>
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #0f172a;
          color: #f8fafc;
        }

        header {
          padding: 25px 8%;
          background: #111c33;
          border-bottom: 1px solid #26344f;
        }

        header h1 {
          margin: 0;
          font-size: 26px;
        }

        header p {
          color: #94a3b8;
          margin-bottom: 0;
        }

        main {
          max-width: 1100px;
          margin: 50px auto;
          padding: 0 20px;
        }

        .welcome {
          margin-bottom: 30px;
        }

        .welcome h2 {
          font-size: 30px;
        }

        .welcome p {
          color: #94a3b8;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .card {
          background: #17243b;
          border: 1px solid #293956;
          border-radius: 12px;
          padding: 25px;
        }

        .card h3 {
          color: #94a3b8;
          font-size: 14px;
          font-weight: normal;
        }

        .value {
          font-size: 24px;
          font-weight: bold;
          color: #38bdf8;
          overflow-wrap: anywhere;
        footer {
          text-align: center;
      </style>
    </head>

    <body>
      <header>
        <h1>CloudOps Dashboard</h1>
        <p>Cloud Infrastructure Overview</p>
      </header>

      <main>
        <section class="welcome">
          <h2>Welcome to CloudOps</h2>
          <p>Application environment overview.</p>
        </section>

        <section class="grid">
          <div class="card">
            <h3>Application</h3>
            <div class="value">CloudOps Dashboard</div>
          </div>

          <div class="card">
            <h3>Environment</h3>
            <div class="value">${ENV}</div>
          </div>

          <div class="card">
            <h3>Application Port</h3>
            <div class="value">${PORT}</div>
          </div>

          <div class="card">
            <h3>Demo Status</h3>
            <span class="badge">Application Responding</span>
          </div>
        </section>
      </main>

      <footer>
        CloudOps Dashboard | DevOps Learning Project
      </footer>
    </body>
    </html>
  `);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`CloudOps Dashboard listening on port ${PORT}`);
  console.log(`Environment: ${ENV}`);
});          padding: 30px;
          color: #64748b;
        }
        }


        .badge {
          font-size: 13px;
        }
          display: inline-block;
          padding: 7px 12px;
          border-radius: 20px;

