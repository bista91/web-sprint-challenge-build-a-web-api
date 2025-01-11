const request = require('supertest');
const app = require('../index.js'); // Correct path to your app entry point
const db = require('../data/dbConfig.js'); // Adjust based on your project setup

describe('Projects API', () => {
  beforeEach(async () => {
    // Reset and seed test database
    await db('projects').truncate();
    await db('projects').insert([
      { id: 1, name: 'Test Project 1', description: 'Description 1', completed: false },
      { id: 2, name: 'Test Project 2', description: 'Description 2', completed: true },
    ]);
  });

  describe('GET /api/projects', () => {
    it('should return a list of projects', async () => {
      const response = await request(app).get('/api/projects');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/projects/:id', () => {
    it('should return a project by id', async () => {
      const response = await request(app).get('/api/projects/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body.name).toBe('Test Project 1');
    });

    it('should return 404 if project does not exist', async () => {
      const response = await request(app).get('/api/projects/999');
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Project not found');
    });
  });

  describe('POST /api/projects', () => {
    it('should create a new project', async () => {
      const newProject = { name: 'Test Project', description: 'Test Description' };
      const response = await request(app).post('/api/projects').send(newProject);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newProject.name);
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app).post('/api/projects').send({});
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Name and description are required');
    });
  });

  describe('PUT /api/projects/:id', () => {
    it('should update a project', async () => {
      const updatedProject = { name: 'Updated Project', description: 'Updated Description' };
      const response = await request(app).put('/api/projects/1').send(updatedProject);
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(updatedProject.name);
    });

    it('should return 404 if project does not exist', async () => {
      const updatedProject = { name: 'Updated Project' };
      const response = await request(app).put('/api/projects/999').send(updatedProject);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Project not found');
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app).put('/api/projects/1').send({});
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Name and description are required');
    });
  });

  describe('DELETE /api/projects/:id', () => {
    it('should delete a project', async () => {
      const response = await request(app).delete('/api/projects/1');
      expect(response.status).toBe(204);
    });

    it('should return 404 if project does not exist', async () => {
      const response = await request(app).delete('/api/projects/999');
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Project not found');
    });
  });
});
