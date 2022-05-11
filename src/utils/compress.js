import Compressor from 'compressorjs';

export function compress(file, width, height) {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      width,
      height,
      quality: 1,
      resize: 'cover',
      success: resolve,
      error: reject,
    });
  });
}
