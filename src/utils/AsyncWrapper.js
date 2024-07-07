const asyncHandler = (fn) => async (req, res, next) => {
    try {
        return await fn(req, res, next);
    } catch (err) {
        return res
            .status(err.statusCode || 500)
            .json({
                message: err.message,
                statusCode: err.statusCode,
                success: false
            });
    }
};

export default asyncHandler;
