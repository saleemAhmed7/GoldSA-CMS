/**
 * Utility functions for client-side image compression and WebP conversion.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  mimeType?: string;
}

/**
 * Resizes and compresses an image File using HTML5 Canvas API.
 * Converts image to WebP format with maximum width of 2000px while maintaining aspect ratio.
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<{ blob: Blob; fileName: string; width: number; height: number }> {
  const maxWidth = options.maxWidth || 2000;
  const maxHeight = options.maxHeight || 2000;
  const quality = options.quality || 0.85;
  const outputMimeType = options.mimeType || "image/webp";

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let { width, height } = img;

        // Calculate aspect ratio scaling
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get 2D canvas context for image compression"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas toBlob failed"));
              return;
            }
            const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
            const fileName = `${cleanName}.webp`;
            resolve({ blob, fileName, width, height });
          },
          outputMimeType,
          quality
        );
      };

      img.onerror = () => reject(new Error("Failed to load image for processing"));
    };

    reader.onerror = () => reject(new Error("Failed to read image file"));
  });
}
