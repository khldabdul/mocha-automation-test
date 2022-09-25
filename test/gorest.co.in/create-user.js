const expect = require('chai').expect;
const req = require('../../lib/request');

describe('Create User', function() {
    it('with valid data should success', async function() {
        const body = req.generateUserData();
        const res = await req.createNewUser(body);

        expect(res.status).to.eq(201);
        expect(res.body.name).to.eq(body.name);
        expect(res.body.email).to.eq(body.email);
        expect(res.body.gender).to.eq(body.gender);
        expect(res.body.status).to.eq(body.status);
    });

    it('with invalid access token should return relevant error message', async function() {
        const body = req.generateUserData();
        const res = await req.createNewUser(body, 'invalidAccessToken');

        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq('Authentication failed');
    });
});
