import { copyFile, writeFile } from "node:fs/promises";

// GitHub Pages looks for a root-level 404.html for unknown URLs.
await copyFile("dist/404/index.html", "dist/404.html");
await writeFile("dist/.nojekyll", "");
