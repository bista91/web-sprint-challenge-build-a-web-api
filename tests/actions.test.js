const request = require('supertest');
const app = require('../index.js'); // Ensure the correct path
const db = require('../data/dbConfig.js'); // Adjust based on your project

describe('Actions API', () => {
  beforeEach(async () => {
    // Reset and seed test database
    await db('actions').truncate(); // Reset the actions table
    await db('actions').insert([ // Insert sample actions for testing
      { id: 1, project_id: 1, description: 'Test action 1', notes: 'Notes 1', completed: false },
      { id: 2, project_id: 2, description: 'Test action 2', notes: 'Notes 2', completed: true },
    ]);
  });

  it('should return a list of actions', async () => {
    const response = await request(app).get('/api/actions');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
  });

  it('should return an action by id', async () => {
    const response = await request(app).get('/api/actions/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    
  });

  it('should return 404 for a non-existent action by id', async () => {
    const response = await request(app).get('/api/actions/999'); // Non-existent action
    expect(response.status).toBe(404); // Expect 404 for non-existent action
    expect(response.body.message).toBe('Action not found');
  });

  it('should create a new action', async () => {
    const newAction = {
      project_id: 1,
      description: 'Test action 3',
      notes: 'Test notes',
      completed: false,
    };
    const response = await request(app).post('/api/actions').send(newAction);
    expect(response.status).toBe(201); // Expect 201 on successful creation
    expect(response.body).toHaveProperty('id');
    expect(response.body.description).toBe(newAction.description);
  });

  it('should return 400 if required fields are missing in POST', async () => {
    const response = await request(app).post('/api/actions').send({ project_id: 1 });
    expect(response.status).toBe(400); // Expect 400 if required fields are missing
    expect(response.body.message).toBe('Project ID and description are required');
  });

  it('should update an action', async () => {
    const updatedAction = { description: 'Updated action', notes: 'Updated notes', completed: true };
    const response = await request(app).put('/api/actions/1').send(updatedAction);
  
    console.log(response.body); // Log the full response to check the returned action
    
    expect(response.status).toBe(200);
    expect(response.body.description).toBe(updatedAction.description);
    expect(response.body.notes).toBe(updatedAction.notes);
    expect(response.body.completed).toBe(updatedAction.completed);
  });
  
  


it('should return 404 when updating a non-existent action', async () => {
    const updatedAction = { description: 'Non-existent action', notes: 'Invalid', completed: false };
    const response = await request(app).put('/api/actions/999').send(updatedAction);
    if (response.status !== 404) console.log('Response:', response.body); // Debugging
    expect(response.status).toBe(404); // Expect 404 if action not found
    expect(response.body.message).toBe('Action not found');
});

  it('should delete an action', async () => {
    const response = await request(app).delete('/api/actions/1');
    expect(response.status).toBe(204); // Correct status code for successful deletion
  });

  it('should return 404 when deleting a non-existent action', async () => {
    const response = await request(app).delete('/api/actions/999'); // Non-existent action
    expect(response.status).toBe(404); // Expect 404 if action not found
    expect(response.body.message).toBe('Action not found');
  });
});
