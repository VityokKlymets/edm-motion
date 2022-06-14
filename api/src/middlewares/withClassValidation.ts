import { validate, ValidationError } from "class-validator"
import ApiError from "classes/ApiError"
import { Request, Response } from "express"
import { getConnection } from "typeorm"
import { assign, values } from "lodash"

const parseErrors = (errors: ValidationError[]) => {
  const result = {}
  for (const error of errors) {
    const { property, constraints } = error
    result[property] = values(constraints).join(", ")
  }

  return result
}

const withClassValidation = function <T>(target?: string | T) {
  return async (req: Request, res: Response, next: Function) => {
    const EntityClass = target || req.body.target

    if (!EntityClass) return next(new ApiError("target is not provided"))

    let entity
    try {
      entity =
        typeof EntityClass === "string"
          ? getConnection().getRepository(EntityClass).create()
          : new EntityClass()
    } catch (error) {
      return next(new ApiError("invalid target"))
    }
    entity = assign(entity, req.body)

    const errors = await validate(entity, { target: false })

    if (errors.length === 0) {
      next()
    } else {
      return next(new ApiError(null, parseErrors(errors)))
    }
  }
}

export default withClassValidation
