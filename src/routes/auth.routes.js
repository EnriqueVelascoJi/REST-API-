import { Router } from "express";
const router = Router();

//Import the controller
import authController from '../controllers/auth.controller'

//Import middleware
import verify from '../middlewares/verifySignup'

router.post('/signup', [verify.checkDuplicateUser, verify.checkRolesExisted], authController.signUp);
router.post('/signin', authController.signIn);

export default router;