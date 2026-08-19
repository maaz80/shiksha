import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, 'out');

function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllHtmlFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.html')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function optimizeHtmlFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  // Ensure CSS links are clean and preloaded
  // Remove onload attributes on link stylesheets if any (for instant CSS render without JS)
  html = html.replace(/<link([^>]*rel=["']stylesheet["'][^>]*)onload=["'][^"']*["']([^>]*)>/gi, '<link$1$2>');

  fs.writeFileSync(filePath, html, 'utf8');
}

function main() {
  console.log('[Post-Export] Optimizing HTML files for No-JS rendering...');
  const htmlFiles = getAllHtmlFiles(outDir);
  let count = 0;

  htmlFiles.forEach((file) => {
    optimizeHtmlFile(file);
    count++;
  });

  console.log(`[Post-Export] Successfully processed ${count} static HTML files.`);
}

main();
