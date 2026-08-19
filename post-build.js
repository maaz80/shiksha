import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
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

function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove onload attributes on link stylesheets if any (for instant CSS render without JS)
  content = content.replace(/<link([^>]*rel=["']stylesheet["'][^>]*)onload=["'][^"']*["']([^>]*)>/gi, '<link$1$2>');

  // 2. Single standard robots tag inject
  const targetRobotsTag = `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>`;
  let replaced = false;
  content = content.replace(/<meta\s+name=["']robots["'][^>]*>/gi, () => {
    if (!replaced) {
      replaced = true;
      return targetRobotsTag;
    }
    return '';
  });
  if (!replaced) {
    content = content.replace(/<head>/i, '<head>\n  ' + targetRobotsTag);
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

// ----------------------------------------------------------------
// PRE-COMPRESSION: Gzip (.gz) & Brotli (.br)
// ----------------------------------------------------------------
const COMPRESSIBLE_EXTENSIONS = new Set([
  '.html', '.js', '.css', '.json', '.xml', '.svg', '.txt', '.map'
]);

function getAllCompressibleFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getAllCompressibleFiles(filePath));
    } else if (COMPRESSIBLE_EXTENSIONS.has(path.extname(file).toLowerCase())) {
      results.push(filePath);
    }
  }
  return results;
}

function preCompressFiles() {
  console.log('\n🗜️  Running pre-compression (gzip & brotli)...');
  const files = getAllCompressibleFiles(outDir);
  let compressedGz = 0;
  let compressedBr = 0;

  for (const filePath of files) {
    try {
      const gzPath = filePath + '.gz';
      if (fs.existsSync(gzPath)) fs.unlinkSync(gzPath);
      const brPath = filePath + '.br';
      if (fs.existsSync(brPath)) fs.unlinkSync(brPath);

      const content = fs.readFileSync(filePath);

      // Gzip Level 9
      const gzipped = zlib.gzipSync(content, { level: 9 });
      if (gzipped.length < content.length) {
        fs.writeFileSync(gzPath, gzipped);
        compressedGz++;
      }

      // Brotli Quality 6
      const brotlied = zlib.brotliCompressSync(content, {
        params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 6 },
      });
      if (brotlied.length < content.length) {
        fs.writeFileSync(brPath, brotlied);
        compressedBr++;
      }
    } catch (err) {
      console.error(`Error compressing ${filePath}:`, err.message);
    }
  }
  console.log(`✅ Pre-compressed ${compressedGz} Gzip (.gz) & ${compressedBr} Brotli (.br) files.`);
}

function main() {
  console.log('[Post-Build] Optimizing HTML files & generating pre-compressed assets...');
  const htmlFiles = getAllHtmlFiles(outDir);
  let count = 0;

  htmlFiles.forEach((file) => {
    processHtmlFile(file);
    count++;
  });

  console.log(`[Post-Build] Successfully optimized ${count} static HTML files.`);
  preCompressFiles();
}

main();
