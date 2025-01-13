function validateActionFields(req, res, next) {
  const { project_id, description, notes, completed } = req.body;

  if (project_id === undefined || description === undefined || notes === undefined) {
      return res.status(400).json({
          message: 'Project ID and description are required',
      });
  }

  if (typeof project_id !== 'number' || project_id <= 0 || !Number.isInteger(project_id)) {
      return res.status(400).json({
          message: 'Project ID must be a positive integer.',
      });
  }

  if (typeof description !== 'string' || description.trim() === '') {
      return res.status(400).json({
          message: 'Description must be a non-empty string.',
      });
  }

  if (typeof notes !== 'string' || notes.trim() === '') {
      return res.status(400).json({
          message: 'Notes must be a non-empty string.',
      });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({
          message: 'Completed must be a boolean value.',
      });
  }

  next();
}
module.exports = { validateActionFields };