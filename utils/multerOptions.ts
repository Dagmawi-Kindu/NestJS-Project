import { HttpException, HttpStatus } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const diskStoragePropertyItems: MulterOptions = {
  storage: diskStorage({
    destination: 'public/property',
    filename: (req, file: Express.Multer.File, callback: any) => {
      if (!file) {
        throw new HttpException('Please upload file', 400);
      }
      let today = new Date();
      let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      let time =
        today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();
      const ext = extname(file.originalname);
      const uniqueSuffix = Math.round(Math.random() * 1e9);
      let filename = `upload-${date}_${time}-${uniqueSuffix}${ext}`;
      callback(null, filename);
    },
  }),
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    if (
      // file.mimetype.startsWith('image')
      // ||
      // file.mimetype.startsWith('application/pdf')
      file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)
    ) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new HttpException('Unsupported file type', HttpStatus.BAD_REQUEST),
        false,
      );
    }
  },
};

export const diskStorageRoomItems: MulterOptions = {
  storage: diskStorage({
    destination: 'public/rooms',
    filename: (req, file: Express.Multer.File, callback: any) => {
      if (!file) {
        throw new HttpException('Please upload file', 400);
      }
      let today = new Date();
      let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      let time =
        today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();
      const ext = extname(file.originalname);
      const uniqueSuffix = Math.round(Math.random() * 1e9);
      let filename = `upload-${date}_${time}-${uniqueSuffix}${ext}`;
      callback(null, filename);
    },
  }),
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    if (
      // file.mimetype.startsWith('image')
      // ||
      // file.mimetype.startsWith('application/pdf')
      file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)
    ) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new HttpException('Unsupported file type', HttpStatus.BAD_REQUEST),
        false,
      );
    }
  },
};

export const diskStorageAgentItems: MulterOptions = {
  storage: diskStorage({
    destination: 'public/agents',
    filename: (req, file: Express.Multer.File, callback: any) => {
      if (!file) {
        throw new HttpException('Please upload file', 400);
      }
      let today = new Date();
      let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      let time =
        today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();
      const ext = extname(file.originalname);
      const uniqueSuffix = Math.round(Math.random() * 1e9);
      let filename = `upload-${date}_${time}-${uniqueSuffix}${ext}`;
      callback(null, filename);
    },
  }),
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    if (
      // file.mimetype.startsWith('image')
      // ||
      // file.mimetype.startsWith('application/pdf')
      file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)
    ) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new HttpException('Unsupported file type', HttpStatus.BAD_REQUEST),
        false,
      );
    }
  },
};

export const diskStorageOwnerItems: MulterOptions = {
  storage: diskStorage({
    destination: 'public/owners',
    filename: (req, file: Express.Multer.File, callback: any) => {
      if (!file) {
        throw new HttpException('Please upload file', 400);
      }
      let today = new Date();
      let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
      let time =
        today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();
      const ext = extname(file.originalname);
      const uniqueSuffix = Math.round(Math.random() * 1e9);
      let filename = `upload-${date}_${time}-${uniqueSuffix}${ext}`;
      callback(null, filename);
    },
  }),
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    if (
      // file.mimetype.startsWith('image')
      // ||
      // file.mimetype.startsWith('application/pdf')
      file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)
    ) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new HttpException('Unsupported file type', HttpStatus.BAD_REQUEST),
        false,
      );
    }
  },
};
