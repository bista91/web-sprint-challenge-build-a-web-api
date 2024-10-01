describe('[POST] /api/projects', () => {
    test('[6] should return 400 if description is missing', async () => {
        const res = await request(server).post('/api/projects').send({ name: 'Project D' });
        expect(res.status).toBe(400);
    });

    test('[7] should return 400 if name is an empty string', async () => {
        const res = await request(server).post('/api/projects').send({ name: '', description: 'Description D' });
        expect(res.status).toBe(400);
    });
});