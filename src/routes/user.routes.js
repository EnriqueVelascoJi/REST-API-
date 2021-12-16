import { Router } from "express";
const router = Router();

//Import the controller
import userController from '../controllers/users.controller'

//Import the middlewares
import auth from '../middlewares/authJw'
import verify from '../middlewares/verifySignup'

router.post('/', [auth.verifyToken, auth.isAdmin, verify.checkDuplicateUser, verify.checkRolesExisted], userController.createUser);
router.get('/', [auth.verifyToken, auth.isAdmin], userController.getUsers);
router.get('/:userId', [auth.verifyToken, auth.isAdmin], userController.getUserById);
router.put('/:userId', [auth.verifyToken, auth.isAdmin], userController.updateUserById);
router.delete('/:userId', [auth.verifyToken, auth.isAdmin], userController.deleteUserById);

export default router;