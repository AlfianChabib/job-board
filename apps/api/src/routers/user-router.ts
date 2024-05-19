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
    this.router.get('/profile/completeness', this.userController.profileCompleteness);
    this.router.patch(
      '/profile',
      validateRequest(UserValidation.validateUpdateProfile, ValidationType.body),
      this.userController.updateProfile,
    );
    this.router.post('/profile/skills', this.userController.addUserSkill);
    this.router.delete('/profile/skills/:skillId', this.userController.deleteUserSkill);
    this.router.post(
      '/profile/experience',
      validateRequest(UserValidation.validateAddUserExperience, ValidationType.body),
      this.userController.addUserExperience,
    );
    this.router.post(
      '/profile/education',
      validateRequest(UserValidation.validateAddUserEducation, ValidationType.body),
      this.userController.addUserEducation,
    );
    this.router.get('/activity/applied', this.userController.getAppliedJobs);
    this.router.get('/activity/interview', this.userController.getinterviewsJobs);
  }

  getRouter(): Router {
    return this.router;
  }
}
