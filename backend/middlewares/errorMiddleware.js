// Global error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);  // Log the error stack for debugging

    res.status(500).json({
        message: err.message || 'Something went wrong. Please try again later.',
        error: err
    });
};

module.exports = errorHandler;
