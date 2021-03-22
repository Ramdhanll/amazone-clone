import express from 'express'
import multer from 'multer'
import { upload } from '../controllers/UploadController.js'
import { isAuth } from '../utils/jwt.js'


const uploadRouter = express.Router()

const storage = multer.diskStorage({
   destination(req, file, cb) {
      cb(null, 'uploads/')
   },
   filename(req, file, cb) {
      const { originalname } = file
      const format = originalname.slice(originalname.indexOf('.')) 
      cb(null, `${Date.now() + format}`)
   }
})
const uploadMulter = multer({ storage })


uploadRouter.post('/', isAuth, uploadMulter.single('image'), upload)


export default uploadRouter