/**
 * Client-side utility for compressing uploaded documents and profile images
 * to ensure request payloads stay well below Vercel and serverless limits (4.5 MB).
 */

export interface CompressionOptions {
  maxDimension?: number; // max width or height in px (default 1200 for docs, 600 for avatar)
  quality?: number; // JPEG quality (0.0 to 1.0, default 0.75)
}

export async function compressImageToDataUrl(
  file: File,
  options: CompressionOptions = {}
): Promise<{ dataUrl: string; size: number }> {
  const { maxDimension = 1200, quality = 0.75 } = options;

  // Non-images (e.g. PDF documents) are read as standard Data URL
  if (!file.type.startsWith("image/")) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve({ dataUrl: result, size: file.size });
      };
      reader.onerror = () => reject(new Error(`Failed to read file ${file.name}`));
      reader.readAsDataURL(file);
    });
  }

  // Process and downscale images using HTML5 Canvas
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (!src) {
        return reject(new Error("Empty image data"));
      }

      const img = new window.Image();
      img.onload = () => {
        try {
          let { width, height } = img;

          // Scale dimensions down if exceeding maxDimension
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, width);
          canvas.height = Math.max(1, height);

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            // Canvas context unavailable, fallback to original
            resolve({ dataUrl: src, size: file.size });
            return;
          }

          // Fill white background for transparent PNGs
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Export compressed JPEG
          const dataUrl = canvas.toDataURL("image/jpeg", quality);

          // Approximate binary size in bytes from base64 string
          const base64Content = dataUrl.split(",")[1] || "";
          const estimatedBytes = Math.round((base64Content.length * 3) / 4);

          resolve({
            dataUrl,
            size: estimatedBytes,
          });
        } catch (err) {
          console.warn("Canvas compression failed, falling back to original:", err);
          resolve({ dataUrl: src, size: file.size });
        }
      };

      img.onerror = () => {
        console.warn("Image load error, falling back to original FileReader result");
        resolve({ dataUrl: src, size: file.size });
      };

      img.src = src;
    };

    reader.onerror = () => reject(new Error(`Failed to read file ${file.name}`));
    reader.readAsDataURL(file);
  });
}
