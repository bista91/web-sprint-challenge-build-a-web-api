module.exports = {
  actionToBody,
  projectToBody,
};

function actionToBody(action) {
  return {
    id: action.id,
    project_id: action.project_id,
    description: action.description,
    notes: action.notes,
  };
}

function projectToBody(project) {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    actions: project.actions || [], // Add actions if available
  };
}