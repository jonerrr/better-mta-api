const err = (res) => {
  return res.status(500).json({
    success: false,
    message: "Error occurred",
  });
};

const problem = (res, message) => {
  return res.status(400).json({
    success: false,
    message,
  });
};

const success = (res, body) => {
  return res.status(200).json({
    success: true,
    ...body,
  });
};

module.exports = { err, problem, success };
