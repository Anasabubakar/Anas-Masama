const fs = require('fs');
const path = require('path');

function buildIco(pngPaths, outPath) {
  const images = pngPaths.map(p => {
    const data = fs.readFileSync(p);
    // Read PNG to get width/height from IHDR (bytes 16-23)
    // PNG signature (8 bytes) + IHDR chunk length (4) + 'IHDR' (4) = starts at offset 8+4+4=16
    const width = data.readUInt32BE(16);
    const height = data.readUInt32BE(20);
    return { path: p, data, width, height };
  });

  const count = images.length;
  // ICONDIR header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(count, 4);

  // ICONDIRENTRY per image (16 bytes)
  const entries = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count; // image data offset start

  images.forEach((img, i) => {
    const entryOffset = i * 16;
    const width = img.width >= 256 ? 0 : img.width;
    const height = img.height >= 256 ? 0 : img.height;
    entries.writeUInt8(width, entryOffset + 0); // width
    entries.writeUInt8(height, entryOffset + 1); // height
    entries.writeUInt8(0, entryOffset + 2); // color palette
    entries.writeUInt8(0, entryOffset + 3); // reserved
    entries.writeUInt16LE(1, entryOffset + 4); // planes (1)
    entries.writeUInt16LE(32, entryOffset + 6); // bit count (32)
    entries.writeUInt32LE(img.data.length, entryOffset + 8); // size in bytes
    entries.writeUInt32LE(offset, entryOffset + 12); // offset
    offset += img.data.length;
  });

  const out = Buffer.concat([header, entries, ...images.map(i => i.data)]);
  fs.writeFileSync(outPath, out);
  console.log('Wrote ICO:', outPath);
}

const base = path.join(__dirname, '..', 'public');
const png16 = path.join(base, 'favicon-16x16.png');
const png32 = path.join(base, 'favicon-32x32.png');
const outIco = path.join(base, 'favicon.ico');

if (!fs.existsSync(png16) || !fs.existsSync(png32)) {
  console.error('Required PNGs not found in public/:', png16, png32);
  process.exit(1);
}

buildIco([png16, png32], outIco);
