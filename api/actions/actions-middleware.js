function validateActionFields(req, res, next) {
    const { project_id, description, notes, completed } = req.body;
  
    // For PUT requests (update), we shouldn't allow project_id to be included in the body
    if (req.method === 'PUT' && project_id !== undefined) {
      return res.status(400).json({
        message: 'Project ID should not be included in the update request.',
      });
    }
  
    // For POST requests (create), validate project_id and description
    if (req.method === 'POST') {
      // Check if required fields are present
      if (project_id === undefined || description === undefined) {
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
    }
  
    // Validate notes
    if (notes === undefined || typeof notes !== 'string' || notes.trim() === '') {
      return res.status(400).json({
        message: 'Notes must be a non-empty string.',
      });
    }
  
    // Validate completed field (it should be a boolean, or undefined)
    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({
        message: 'Completed must be a boolean value.',
      });
    }
  
    // Proceed to the next middleware or controller if no validation errors
    next();
  }
  
  module.exports = { validateActionFields };
  