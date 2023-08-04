import express from 'express';
import productsRouter from './products.router.js';
import cartsRouter from './carts.router.js';
import messagesRouter from './messages.router.js';
import viewsRouter from './views.router.js';
import sessionsRouter from './sessions.router.js';

export default function configureRoutes(app) {
  app.use('/api/alive', (req, res) => {
    res.status(200).json({ status: 1, message: 'Flowery 4107 backend is alive' });
  });

  app.use('/api/sessions', sessionsRouter);
  app.use('/api/products', productsRouter);
  app.use('/api/carts', cartsRouter);
  app.use('/api/messages', messagesRouter);
  app.use('/', viewsRouter);
}
