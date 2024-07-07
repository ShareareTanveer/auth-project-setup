export default asyncWrapper = (fn) => async (req, res, next) => {
    try {
        return await fn(req, res, next)
    }
    catch (error) {
        console.log("API Exeption", error)
        return res
            .status(err.status || 500)
            .json({
                message: err.message,
                statusCode: err.status || 500,
                success: false
            })
    }
}