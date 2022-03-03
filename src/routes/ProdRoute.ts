import { Router } from 'express';

import Controller from '../controllers/Products';
import Services from '../services/Products';

const router = Router();

router.post(
  '/products',
  Services.validateToken,
  Services.validateName,
  Services.validateAmount,
  Controller.create,
);

router.get(
  '/products',
  Services.validateToken,
  Controller.getAll,
);

export default router;