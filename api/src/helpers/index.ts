import { Response } from "express"

export const handleApiError = (error: ApiError, res: Response) => {
  const response: IApiResponse = {
    status: "error",
    error,
  }
  res.json(response)
}
