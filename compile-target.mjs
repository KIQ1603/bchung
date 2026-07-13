import { OfflineCompiler } from 'mind-ar/src/image-target/offline-compiler.js';
import { writeFile } from 'fs/promises';
import { loadImage } from 'canvas';

// Ảnh dùng làm điểm nhận diện AR (image target). Thêm nhiều ảnh vào mảng
// này nếu muốn một file .mind chứa nhiều target (targetIndex: 0, 1, 2, ...).
const imagePaths = ['./POSTER  2.png'];

async function run() {
  const images = await Promise.all(imagePaths.map((p) => loadImage(p)));
  const compiler = new OfflineCompiler();
  await compiler.compileImageTargets(images, (progress) => {
    console.log(`Đang biên dịch... ${progress.toFixed(1)}%`);
  });
  const buffer = compiler.exportData();
  await writeFile('targets.mind', buffer);
  console.log(`Đã tạo targets.mind (${images.length} ảnh mục tiêu)`);
}

run();
