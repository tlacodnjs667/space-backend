import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

const AWS_S3_BUCKET = 'ap-northeast-2';

const INFOOFS3: S3ClientConfig = {
  region: AWS_S3_BUCKET,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY ?? '',
    secretAccessKey: process.env.AWS_SECRET_KEY ?? '',
  },
};
const s3 = new S3Client(INFOOFS3);

export const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'space-che',
    key: async (req, file, cb) => {
      const extension = path.extname(file.originalname);
      cb(null, `${extension}/${Date.now()}_${file.originalname}`);
    },
  }),
}).single('file');
