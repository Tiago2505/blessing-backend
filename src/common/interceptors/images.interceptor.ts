import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

export const ImagesInterceptor = () =>
  FilesInterceptor('images', 5, {
    storage: memoryStorage(),
    limits: {
      files: 5,
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  });
