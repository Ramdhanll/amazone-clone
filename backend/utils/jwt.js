import jwt from 'jsonwebtoken'

export const generateToken = user => {
   return jwt.sign({
      _id: user._id,
      user: user.name,
      email: user.email,
      isAdmin: user.isAdmin
   }, process.env.JWT_SECRET, {
      expiresIn: '30d'
   })
}

export const isAuth = (req, res, next) => {
   const {authorization} = req.headers
   if (!authorization) return res.status(401).json({ message: 'you must be logged in'})

   const token = authorization.replace("Bearer ", "")
   jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decode) => {
      if (err) return res.status(401).json({ message: 'Invalid Token', err})
      /**
       * value decode
       * _id: xxx
       * user: xxx
       * email: xxx
       * xxxx: xxxxx
       */
      req.user = decode
      next()
   })
}

export const isAdmin = (req, res, next) => {
   if (req.user && req.user.isAdmin ) {
      next()
   } else {
      res.status(401).json({ message: 'Invalid Admin Token'})
   }
}