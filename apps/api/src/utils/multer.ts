import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const fileLimit = { fileSize: 1024 * 1024 };
const pdfLimit = { fileSize: 1024 * 1024 * 2 };

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const extFilter = ['jpg', 'jpeg', 'png', 'pdf'];
  const checkExt = extFilter.includes(file.mimetype.split('/')[1].toLowerCase());
  if (!checkExt) {
    return cb(new Error('Invalid file extension'));
  } else cb(null, true);
};

export const multerUpload = (filePrefix: string, folderName: string) => {
  const destination = `public/${folderName}`;
  const storage = multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb: DestinationCallback) => {
      cb(null, destination);
    },
    filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
      let filename: string;
      const originalname = file.originalname.split('.');
      const fileExt = originalname[originalname.length - 1];
      filename = `${filePrefix}-${Date.now()}.${fileExt}`;
      if (filePrefix === 'cv') {
        filename = `${filePrefix}-${req.user.email}-${Date.now()}.${fileExt}`;
      }
      cb(null, filename);
    },
  });
  return multer({ storage, fileFilter, limits: filePrefix === 'cv' ? pdfLimit : fileLimit });
};

export const uploadUserProfile = multerUpload('user', 'user').single('image');
export const uploadLogo = multerUpload('logo', 'logo').single('image');
export const uploadCv = multerUpload('cv', 'cv').single('file');
