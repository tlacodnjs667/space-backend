import { Injectable, NestMiddleware } from '@nestjs/common';
import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import 'dotenv/config';

const s3ClientConfig: S3ClientConfig = {
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY ?? '',
    secretAccessKey: process.env.AWS_SECRET_KEY ?? '',
  },
};
const s3 = new S3Client(s3ClientConfig);
const uploadDirectory = 'TEST';

@Injectable()
export class FileUploaderMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const uploader = multer({
      storage: multerS3({
        s3,
        bucket: process.env.BUCKET ?? '',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: async (req, file, cb) => {
          console.log(req);

          file.originalname = file.originalname.split('').join('');
          cb(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
        },
      }),
    }).single('file');
    uploader(req, res, next);
  }
}
