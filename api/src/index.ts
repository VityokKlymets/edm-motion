import 'reflect-metadata';
import 'express-async-errors';
import express, { Request, Response } from 'express';
import passport from 'passport';
import cors from 'cors';

import { createConnection } from 'typeorm';

import NewsController from 'controllers/NewsController';
import UserController from 'controllers/UserController';
import ArtistController from 'controllers/ArtistController';
import EntityController from 'controllers/EntityController';
import SongController from 'controllers/SongController';
import GenreController from 'controllers/GenreController';
import LabelController from 'controllers/LabelController';
import SetupController from 'controllers/SetupController';

import { handleApiError } from 'helpers';
import { parse } from 'dotenv';
import { getCommonConfig } from 'utils/config';
import { generateSitemap } from 'utils/sitemap';

const envConfig = parse(Buffer.from(`${getCommonConfig()}`));

for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

const runServer = async () => {
  const { STATIC_FOLDER_NAME } = process.env;

  const app = express();

  app.use(express.static(STATIC_FOLDER_NAME));

  app.use(passport.initialize());

  await createConnection();

  await generateSitemap();

  app.use(
    cors({
      origin: '*',
      credentials: true,
    }),
  );

  app.use('/api/news', new NewsController().Router);
  app.use('/api/user', new UserController().Router);
  app.use('/api/entity', new EntityController().Router);
  app.use('/api/artist', new ArtistController().Router);
  app.use('/api/song', new SongController().Router);
  app.use('/api/genre', new GenreController().Router);
  app.use('/api/label', new LabelController().Router);
  app.use('/api/setup', new SetupController().Router);

  app.use((error: any, req: Request, res: Response) => {
    console.log(error);
    return handleApiError(error, res);
  });

  const server = app.listen(3030);

  return server;
};

runServer();
