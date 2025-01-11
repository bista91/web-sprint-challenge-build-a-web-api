function validateProjectFields(req, res, next) {
  const { name, description, completed } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      message: 'Name and description are required',
    });
  }

  if (typeof name !== 'string' || typeof description !== 'string') {
    return res.status(400).json({
      message: 'Name and description must be strings.',
    });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({
      message: 'Completed must be a boolean value.',
    });
  }

  next();
}

module.exports = {
  validateProjectFields,
};
