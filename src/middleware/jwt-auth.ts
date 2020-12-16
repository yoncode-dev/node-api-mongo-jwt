// Middleware
import * as jwt from 'jsonwebtoken';

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

export default verificaJWT;