import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { networkInterfaces } from "node:os";
import { extname, resolve, sep } from "node:path";
import { createGzip } from "node:zlib";

const host = "0.0.0.0";
const port = Number(process.argv[2] ?? process.env.PORT ?? 5500);
const root = resolve(import.meta.dirname);
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  "": "text/html; charset=utf-8",
};

function resolveRequestPath(url) {
  const pathname = decodeURIComponent(new URL(url, "http://localhost").pathname);
  const requestedPath = resolve(root, `.${pathname}`);

  return requestedPath === root || requestedPath.startsWith(`${root}${sep}`)
    ? requestedPath
    : null;
}

function findLanAddress() {
  return Object.values(networkInterfaces())
    .flat()
    .find((address) => address?.family === "IPv4" && !address.internal)?.address;
}

createServer((request, response) => {
  let filePath = resolveRequestPath(request.url ?? "/");

  if (filePath === root) {
    filePath = resolve(root, "index.html");
  }

  if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Página não encontrada.");
    return;
  }

  const extension = extname(filePath);
  const acceptsGzip = request.headers["accept-encoding"]?.includes("gzip");
  const isCompressible = ["", ".css", ".html", ".js", ".json", ".svg"].includes(extension);
  const useGzip = acceptsGzip && isCompressible;

  response.writeHead(200, {
    "Cache-Control": "no-store",
    "Content-Security-Policy":
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'none'",
    "Content-Encoding": useGzip ? "gzip" : "identity",
    "Content-Type": contentTypes[extension] ?? "application/octet-stream",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    Vary: "Accept-Encoding",
    "X-Content-Type-Options": "nosniff",
  });

  const fileStream = createReadStream(filePath);
  useGzip ? fileStream.pipe(createGzip()).pipe(response) : fileStream.pipe(response);
}).listen(port, host, () => {
  console.log(`Local: http://localhost:${port}`);
  console.log(`LAN: http://${findLanAddress()}:${port}`);
});
