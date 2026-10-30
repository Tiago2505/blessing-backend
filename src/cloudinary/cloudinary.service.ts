import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { handleError } from '../common/helpers';

type ImageFile = {
  mimetype: string;
  buffer: Buffer;
};

@Injectable()
export class CloudinaryService {
  constructor(configService: ConfigService) {
    cloudinary.config({
      cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.get('CLOUDINARY_API_KEY'),
      api_secret: configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImages(files: ImageFile[], folder: string) {
    try {
      const result = await Promise.all(
        files.map((file) =>
          cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
            {
              folder,
              resource_type: 'image',
            },
          ),
        ),
      );

      return result.map((image) => ({
        publicId: image.public_id,
        secureUrl: image.secure_url,
      }));
    } catch (error) {
      handleError(error);
    }
  }

  async deleteImage(publicIds: string[]) {
    try {
      const result = Promise.all(
        publicIds.map((id) => {
          cloudinary.uploader.destroy(id, {
            resource_type: 'image',
          });
        }),
      );

      return result;
    } catch (error) {
      handleError(error);
    }
  }

  
}
