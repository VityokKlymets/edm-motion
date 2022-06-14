class ApiError {
  public errors: IError
  public message: string
  constructor(message = "", errors: IError = {}) {
    this.message = message
    this.errors = errors
  }
}

export default ApiError
