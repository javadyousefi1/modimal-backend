const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    let notValidFeildName = err.path.split(".")[1];
    return res.status(400).json({
      statusCode: res.statusCode,
      type: notValidFeildName,
      message: err.message,
    });
  }
};

module.exports = {
  validate,
};
