import { Router } from 'express';
import { UserController } from '../controllers/user-controller';
import { validateRequest, ValidationType } from '../validation/validation';
import { UserValidation } from '../validation/user-validation';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get('/profile', this.userController.getProfile);
    this.router.patch(
      '/profile',
      validateRequest(UserValidation.validateUpdateProfile, ValidationType.body),
      this.userController.updateProfile,
    );
    this.router.post('/profile/skills', this.userController.addUserSkill);
    this.router.delete('/profile/skills/:skillId', this.userController.deleteUserSkill);
  }

  getRouter(): Router {
    return this.router;
  }
}
