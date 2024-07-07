class ApiResponse  {
    constructor(
        statusCode,
        data,
        meassage = "success",
    ) {
        this.statusCode = statusCode
        this.meassage = meassage
        this.data = data
        this.success = statusCode < 400
    }
}

export default ApiResponse;