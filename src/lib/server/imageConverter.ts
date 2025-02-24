import sharp from 'sharp';

export type SupportedFormat = 
  | 'jpeg' 
  | 'png' 
  | 'webp' 
  | 'gif' 
  | 'tiff' 
  | 'avif'
  | 'heif';

export interface ConversionOptions {
  format: SupportedFormat;
  quality?: number;
  width?: number;
  height?: number;
}

export interface ConversionResult {
  success: boolean;
  data?: Buffer;
  error?: string;
  format: string;
  size: number;
}

export async function convertImage(
  input: Buffer,
  options: ConversionOptions
): Promise<ConversionResult> {
  try {
    let converter = sharp(input);
    
    // Resize if dimensions are provided
    if (options.width || options.height) {
      converter = converter.resize(options.width, options.height, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Convert to the target format
    switch (options.format) {
      case 'jpeg':
        converter = converter.jpeg({ quality: options.quality || 80 });
        break;
      case 'png':
        converter = converter.png({ quality: options.quality || 80 });
        break;
      case 'webp':
        converter = converter.webp({ quality: options.quality || 80 });
        break;
      case 'gif':
        converter = converter.gif();
        break;
      case 'tiff':
        converter = converter.tiff({ quality: options.quality || 80 });
        break;
      case 'avif':
        converter = converter.avif({ quality: options.quality || 80 });
        break;
      case 'heif':
        converter = converter.heif({ quality: options.quality || 80 });
        break;
      default:
        throw new Error('Unsupported format');
    }

    const outputBuffer = await converter.toBuffer();
    
    return {
      success: true,
      data: outputBuffer,
      format: options.format,
      size: outputBuffer.length
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      format: options.format,
      size: 0
    };
  }
}
