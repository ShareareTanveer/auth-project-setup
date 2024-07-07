export default class ApiExeption extends Error {
    constructor(
        statusCode,
        meassage = "Something Went Wrong!",
        errors = [],
        stack = ""
    ) {
        super(meassage)
        this.meassage = meassage
        this.statusCode = statusCode
        this.errors = errors
        this.data = null
        this.success = false

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}