import * as mongoose from 'mongoose';
import { UserSchema } from '../models/user'
import { Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';

const User = mongoose.model('User', UserSchema);

export class UserController {

  // logar
  public logar (req: Request, res: Response) {
    User.findOne({'email': req.body.email}, (err, user) => {
      if(err) {
        res.send(err);
      } else {
        if(user) {
          const token = jwt.sign({user}, process.env.SECRET, {
            expiresIn: 3000
          });
          return res.json({ auth: true, token: token});
        }

        res.status(401).send({
          message: 'Não autorizado'
        })
      }
    })
  }

  // me
  public me(req: Request, res: Response) {
    const user = req['user'];

    res.status(200).send(user);
  }


  //list all
  public addNew (req: Request, res: Response) {
    let user = new User(req.body);

    user.save((err, newuser) => {
      if(err) {
        res.send(err);
      }
      res.json(newuser);
    })
  }

  // All users
  public getAllUser(req: Request, res: Response) {
    User.find({}, (err, users) => {
      if(err) {
        res.send(err);
      }
      res.json(users);
    });
  }

  // Get user id
  public getUser(req: Request, res: Response) {
    User.findById(req.params.id, (err, user) => {
      if(err) {
        res.send(err);
      }
      res.json(user);
    });
  }

  // Update
  public updateUser(req: Request, res: Response) {
    User.findOneAndUpdate(
      {_id: req.params.id}, 
      req.body, 
      {new: true}, 
      (err, user) => {
      if(err) {
        res.send(err);
      }
      res.json(user);
    });
  }

  // delete
  public deleteUser(req: Request, res: Response) {
    User.remove({ _id: req.params.id }, (err) => {
      if(err) {
        res.send(err);
      }
      res.json({
        message: 'O usuário foi removido'
      });
    })
  }
}