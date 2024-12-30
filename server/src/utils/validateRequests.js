const validateRequestBody = (requiredFields) => (req, res, next) => {
    console.log(requiredFields)
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    console.log(missingFields)
    if (missingFields.length > 0) {
        return res.status(400).json({
            error: 'Missing required field',
            message: `Missing required fields: ${missingFields.join(', ')}`,
        });
    }
    next();
};

module.exports = validateRequestBody;
