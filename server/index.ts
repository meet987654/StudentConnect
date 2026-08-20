import "dotenv/config";
import express, { type Express, type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";

function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

const app = express();

// Add logging BEFORE any middleware
app.use((req, res, next) => {
  console.log(`>>> INCOMING REQUEST: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

async function buildApp(): Promise<Express> {
  await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    log(`Error: ${message}`, "error");
    res.status(status).json({ message });
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "development") {
    // We use a variable to prevent esbuild from statically analyzing and bundling vite
    const viteModule = "./vite";
    const { setupVite } = await import(viteModule);
    await setupVite(app, createServer(app));
  } else {
    const { serveStatic } = await import("./static");
    serveStatic(app);
  }

  return app;
}

let appPromise: Promise<Express> | undefined;

if (!process.env.VERCEL) {
  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  (appPromise ??= buildApp()).then((builtApp) => {
    const port = parseInt(process.env.PORT || '3001', 10);
    createServer(builtApp).listen(port, "0.0.0.0", () => {
      log(`serving on port ${port}`);
    });
  });
}

// Vercel runs this as a serverless function: the awaited Express app
// handles the request exactly like it would locally.
export default async function handler(req: Request, res: Response) {
  const builtApp = await (appPromise ??= buildApp());
  builtApp(req, res);
}