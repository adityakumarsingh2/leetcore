const errorMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;

    if (process.env.NODE_ENV !== "test") {
        console.error(error);
    }

    return res.status(statusCode).json({
        success: false,
        message: error.message || "Internal server error",
        ...(error.details ? { details: error.details } : {}),
    });
};

export default errorMiddleware;
