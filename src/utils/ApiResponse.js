export default class ApiResponse  {
    constructor(
        statusCode,
        data,
        meassage = "Success",
    ) {
        this.statusCode = statusCode
        this.meassage = meassage
        this.data = data
        this.success = statusCode < 400
    }
}