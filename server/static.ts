import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  let distPath = path.resolve(process.cwd(), "dist", "public");

  if (!fs.existsSync(distPath)) {
    const fallbackPath = path.resolve(process.cwd(), "public");
    if (fs.existsSync(fallbackPath)) {
      distPath = fallbackPath;
    } else {
      console.warn(`Could not find the build directory: ${distPath}, make sure to build the client first`);
    }
  }

  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
  }

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}