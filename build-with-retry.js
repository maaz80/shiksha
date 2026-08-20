import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3000;

function runStep(command, args, stepName) {
  console.log(`\n[Build Runner] Running ${stepName}...`);
  const result = spawnSync(command, args, {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env }
  });
  return result.status === 0;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function buildWithRetry() {
  console.log('====================================================');
  console.log('🚀 Starting Automated Build Flow (with Auto-Retry)');
  console.log('====================================================');

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    console.log(`\n📌 Build Attempt ${attempt} of ${MAX_RETRIES}`);

    // 1. Generate sitemaps & static SEO files
    const sitemapSuccess = runStep('node', ['generate_static_sitemaps.js'], 'Sitemap Generator');
    if (!sitemapSuccess) {
      console.error(`⚠️ Sitemap generation failed on attempt ${attempt}.`);
    }

    // 2. Execute Next.js export build
    const nextBuildSuccess = runStep('node', ['--max-old-space-size=4096', './node_modules/next/dist/bin/next', 'build'], 'Next.js Production Export Build');

    if (nextBuildSuccess) {
      // 3. Run post-build script if present
      runStep('node', ['post-build.js'], 'Post Build Processing');
      console.log(`\n✅ [Build Runner] Build successfully completed on attempt ${attempt}!`);
      process.exit(0);
    }

    console.error(`\n❌ [Build Runner] Build failed on attempt ${attempt}.`);

    if (attempt < MAX_RETRIES) {
      console.log(`🔄 Restarting build process in ${RETRY_DELAY_MS / 1000} seconds...`);
      await sleep(RETRY_DELAY_MS);
    } else {
      console.error(`\n💥 [Build Runner] All ${MAX_RETRIES} build attempts failed.`);
      process.exit(1);
    }
  }
}

buildWithRetry();
