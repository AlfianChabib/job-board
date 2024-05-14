import { Router } from 'express';
import { DataController } from '../controllers/data-controller';

export class DataRouter {
  private router: Router;
  private dataController: DataController;

  constructor() {
    this.router = Router();
    this.dataController = new DataController();
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get('/classification', this.dataController.classification);
    this.router.get('/sub-classification', this.dataController.subClassification);
    this.router.get('/skills/:text', this.dataController.getSkill);
  }

  getRouter(): Router {
    return this.router;
  }
}
