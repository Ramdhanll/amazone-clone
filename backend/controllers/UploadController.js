import expressAsyncHandler from 'express-async-handler'

export const upload = expressAsyncHandler((req, res) => {
   res.status(200).json(`/${req.file.path}`)
})
