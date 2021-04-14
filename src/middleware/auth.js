const check = (req, res, next) => {
  if (!req.query.key)
    return res.status(400).json({
      success: false,
      message: "Missing API key",
    });

  next();
};

module.exports = check;
