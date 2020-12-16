import { Request, Response } from 'express';

import { UserController} from '../controller/user';
import validaJwt from '../middleware/jwt-auth';

export class Routes {

  public userController: UserController = new UserController();

  public routes(app): void {
    app.route('/').get((req: Request, res: Response) => {
      res.status(200).send({
        message: 'GET REQUEST OK'
      });
    });

    // Logar
    app.route('/logar').post(this.userController.logar);

    // me
    app.route('/me').get(validaJwt, this.userController.me);

    // list and post
    app.route('/user')
    .get(validaJwt, this.userController.getAllUser)
    .post(this.userController.addNew);
    
    // detail and PUT and DELETE
    app.route('/user/:id')
    .get(this.userController.getUser)
    .put(this.userController.updateUser)
    .delete(this.userController.deleteUser)

  }
}