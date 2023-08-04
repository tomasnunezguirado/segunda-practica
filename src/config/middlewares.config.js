import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export default function configureMiddlewares(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({
    origin: '*'
  }));
  app.use(cookieParser());
}
