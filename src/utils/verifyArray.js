 const validateArrayField = (field, fieldName, res) => {
    try {
        const parsedField = JSON.parse(field);
        if (!Array.isArray(parsedField)) {
            res.status(400).json({
                status: 400,
                message: `${fieldName} is not an array type`,
                data: null,
            });
            return null;
        }
        return parsedField;
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: `Invalid JSON format for ${fieldName}`,
            data: null,
        });
        return null;
    }
};

module.exports ={validateArrayField}