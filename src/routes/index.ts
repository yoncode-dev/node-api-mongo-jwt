import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { UserController} from '../controller/user';



// Middleware
function verificaJWT(req, res, next) {
  const token = req.headers.authorization;

  if(!token) return res.status(401).json({ auth: false, message: 'Sem token'});

  jwt.verify(token.replace('Bearer ', ''), process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).json(
      {auth: false, message: 'falha para autenticar'});
    
    req.user = decoded.user;
    next();
  });
}


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
    app.route('/me').get(verificaJWT, this.userController.me);

    // list and post
    app.route('/user')
    .get(verificaJWT, this.userController.getAllUser)
    .post(this.userController.addNew);
    
    // detail and PUT and DELETE
    app.route('/user/:id')
    .get(this.userController.getUser)
    .put(this.userController.updateUser)
    .delete(this.userController.deleteUser)

  }
}