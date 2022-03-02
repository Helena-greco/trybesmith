import { Router } from 'express';

import Controller from '../controllers/User';

import Services from '../services/User';

const router = Router();

router.post(
  '/users', 
  Services.validateUsername,
  Services.validateClasse,
  Services.validateLevel,
  Services.validatePassword,
  Controller.createUser,
);

export default router;