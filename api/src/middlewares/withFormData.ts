import formidable from "formidable"
import { Request, Response } from "express"
import ApiError from "classes/ApiError"

const withFormData = () => (req: Request, res: Response, next: Function) => {
  const form = formidable()
  form.keepExtensions = true

  const data = {}
  form.parse(req, (err, fields: object, files) => {
    if (err) {
      next(err)
      return
    }
    Object.keys(fields).forEach((key) => {
      try {
        data[key] = JSON.parse(fields[key])
      } catch (error) {
        next(new ApiError("invalid json"))
        return
      }
    })

    Object.keys(files).forEach((key) => {
      data[key] = files[key]
    })
    req.body = data

    next()
  })
}

export default withFormData
