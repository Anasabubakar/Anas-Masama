const Jimp = require('jimp');
const pngToIco = require('png-to-ico');
const fs = require('fs');
const path = require('path');

async function run() {
  const src = path.join(__dirname, '..', 'public', 'images', 'anas-masama.png');
  const out = path.join(__dirname, '..', 'public');

  if (!fs.existsSync(src)) {
    console.error('Source image not found:', src);
    process.exit(1);
  }

  const img = await Jimp.read(src);

  // sizes
  const sizes = [16, 32, 48, 180, 192, 512];
  const produced = [];

  for (const s of sizes) {
    const fileName = `icon-${s}.png`;
    const dest = path.join(out, fileName);
    await img.clone().cover(s, s).writeAsync(dest);
    produced.push({ size: s, path: dest });
    console.log('Wrote', dest);
  }

  // also write conventional names
  await fs.promises.copyFile(path.join(out, 'icon-16.png'), path.join(out, 'favicon-16x16.png'));
  await fs.promises.copyFile(path.join(out, 'icon-32.png'), path.join(out, 'favicon-32x32.png'));
  await fs.promises.copyFile(path.join(out, 'icon-192.png'), path.join(out, 'icon-192.png'));
  await fs.promises.copyFile(path.join(out, 'icon-512.png'), path.join(out, 'icon-512.png'));
  await fs.promises.copyFile(path.join(out, 'icon-180.png'), path.join(out, 'apple-touch-icon.png'));

  // create ICO from 16,32,48
  const icoBuffer = await pngToIco([path.join(out, 'icon-16.png'), path.join(out, 'icon-32.png'), path.join(out, 'icon-48.png')]);
  fs.writeFileSync(path.join(out, 'favicon.ico'), icoBuffer);
  console.log('Wrote', path.join(out, 'favicon.ico'));

  // create manifest
  const manifest = {
    name: 'Anas Masama',
    short_name: 'Anas',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    start_url: '/',
    display: 'standalone',
    theme_color: '#0ea5a4',
    background_color: '#ffffff'
  };

  fs.writeFileSync(path.join(out, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('Wrote', path.join(out, 'site.webmanifest'));
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
