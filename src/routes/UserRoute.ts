import { Router } from 'express';

import Controller from '../controllers/User';
import LoginController from '../controllers/Login';
import Services from '../services/User';
import LoginServices from '../services/Login';

const router = Router();

router.post(
  '/users', 
  Services.validateUsername,
  Services.validateClasse,
  Services.validateLevel,
  Services.validatePassword,
  Controller.createUser,
);

router.post(
  '/login',
  LoginServices.valUsername,
  LoginServices.valPassword,
  LoginServices.validUsername,
  LoginServices.validPassword,
  LoginController.getLogin,
);

export default router;