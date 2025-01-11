module.exports = {
  projectToBody,
  actionToBody
};

// Convert project from database format to the API response format
function projectToBody(project) {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    completed: project.completed
  };
}

// Convert action from database format to the API response format
function actionToBody(action) {
  return {
    id: action.id,
    project_id: action.project_id,
    description: action.description,
    notes: action.notes,
    completed: action.completed
  };
}
