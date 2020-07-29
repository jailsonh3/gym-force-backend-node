import { Router } from 'express';

const routes = new Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Corretor...' });
});

export default routes;
