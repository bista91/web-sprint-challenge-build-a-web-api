const request = require('supertest');
const db = require('../data/dbConfig');
const Action = require('../api/actions/actions-model');
const Project = require('../api/projects/projects-model');
const server = require('../api/server');

const projectA = {
  name: 'Project A', description: 'Description A', completed: false,
};
const projectB = {
  name: 'Project B', description: 'Description B', completed: true,
};
const actionA = {
  project_id: 1, description: 'Action A', notes: 'Notes A', completed: false,
};
const actionB = {
  project_id: 1, description: 'Action B', notes: 'Notes B', completed: true,
};
const actions = [actionA, actionB];

beforeAll(async () => {
  await db.migrate.latest();
});
beforeEach(async () => {
  await db('actions').truncate();
  await db('projects').truncate();
  await db('projects').insert([projectA, projectB]);
  await db('actions').insert([actionA, actionB]);
});
afterAll(async () => {
  await db.destroy();
});

test('[0] sanity check', () => {
  expect(true).not.toBe(false);
});

describe('Projects API', () => {
  describe('[GET] /api/projects', () => {
    test('[1] should return all projects', async () => {
      const res = await request(server).get('/api/projects');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toMatchObject(projectA);
      expect(res.body[1]).toMatchObject(projectB);
    });

    test('[2] should return empty array if no projects', async () => {
      await db('projects').truncate();
      const res = await request(server).get('/api/projects');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(0);
    });
  });

  describe('[GET] /api/projects/:id', () => {
    test('[3] should return project by ID', async () => {
      const res = await request(server).get('/api/projects/1');
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(projectA);
    });

    test('[4] should return 404 if project not found', async () => {
      const res = await request(server).get('/api/projects/999');
      expect(res.status).toBe(404);
    });
  });

  describe('[POST] /api/projects', () => {
    test('[5] should create a new project', async () => {
      const newProject = { name: 'Project C', description: 'Description C', completed: false };
      const res = await request(server).post('/api/projects').send(newProject);
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject(newProject);
    });

    test('[6] should return 400 if required fields are missing', async () => {
      const res = await request(server).post('/api/projects').send({ name: 'Project D' });
      expect(res.status).toBe(400);
    });
  });

  describe('[PUT] /api/projects/:id', () => {
    test('[7] should update project by ID', async () => {
      const updatedProject = { name: 'Updated Project A', description: 'Updated Description A', completed: true };
      const res = await request(server).put('/api/projects/1').send(updatedProject);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(updatedProject);
    });

    test('[8] should return 404 if project not found', async () => {
      const res = await request(server).put('/api/projects/999').send({ name: 'Updated Project' });
      expect(res.status).toBe(404);
    });

    test('[9] should return 400 if required fields are missing', async () => {
      const res = await request(server).put('/api/projects/1').send({ name: 'Incomplete Update' });
      expect(res.status).toBe(400);
    });
  });

  describe('[DELETE] /api/projects/:id', () => {
    test('[10] should delete project by ID', async () => {
      await request(server).delete('/api/projects/1');
      const res = await request(server).get('/api/projects');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toMatchObject(projectB);
    });

    test('[11] should return 404 if project not found', async () => {
      const res = await request(server).delete('/api/projects/999');
      expect(res.status).toBe(404);
    });
  });

  describe('[GET] /api/projects/:id/actions', () => {
    test('[12] should return actions for a project', async () => {
      const res = await request(server).get('/api/projects/1/actions');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.arrayContaining(actions));
    });

    test('[13] should return empty array if no actions for project', async () => {
      const res = await request(server).get('/api/projects/2/actions');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(0);
    });
  });
});

describe('Actions API', () => {
  describe('[GET] /api/actions', () => {
    test('[14] should return all actions', async () => {
      const res = await request(server).get('/api/actions');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toMatchObject(actionA);
      expect(res.body[1]).toMatchObject(actionB);
    });

    test('[15] should return empty array if no actions', async () => {
      await db('actions').truncate();
      const res = await request(server).get('/api/actions');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(0);
    });
  });

  describe('[GET] /api/actions/:id', () => {
    test('[16] should return action by ID', async () => {
      const res = await request(server).get('/api/actions/1');
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(actionA);
    });

    test('[17] should return 404 if action not found', async () => {
      const res = await request(server).get('/api/actions/999');
      expect(res.status).toBe(404);
    });
  });

  describe('[POST] /api/actions', () => {
    test('[18] should create a new action', async () => {
      const newAction = { project_id: 2, description: 'Action C', notes: 'Notes C', completed: false };
      const res = await request(server).post('/api/actions').send(newAction);
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject(newAction);
    });

    test('[19] should return 400 if required fields are missing', async () => {
      const res = await request(server).post('/api/actions').send({ project_id: 2, description: 'Action D' });
      expect(res.status).toBe(400);
    });
  });

  describe('[PUT] /api/actions/:id', () => {
    test('[20] should update action by ID', async () => {
      const updatedAction = { description: 'Updated Action A', notes: 'Updated Notes A', completed: true };
      const res = await request(server).put('/api/actions/1').send(updatedAction);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(updatedAction);
    });

    test('[21] should return 404 if action not found', async () => {
      const res = await request(server).put('/api/actions/999').send({ description: 'Update' });
      expect(res.status).toBe(404);
    });

    test('[22] should return 400 if required fields are missing', async () => {
      const res = await request(server).put('/api/actions/1').send({ description: 'Incomplete Update' });
      expect(res.status).toBe(400);
    });
  });

  describe('[DELETE] /api/actions/:id', () => {
    test('[23] should delete action by ID', async () => {
      await request(server).delete('/api/actions/1');
      const res = await request(server).get('/api/actions');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toMatchObject(actionB);
    });

    test('[24] should return 404 if action not found', async () => {
      const res = await request(server).delete('/api/actions/999');
      expect(res.status).toBe(404);
    });
  });
});