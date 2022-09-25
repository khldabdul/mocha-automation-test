const expect = require('chai').expect;
const req = require('../../lib/request');

describe('Update User', function() {
    let resCreate;
    let createdId;
    before(async function () {
        const bodyCreate = req.generateUserData();
        resCreate = await req.createNewUser(bodyCreate);
        expect(resCreate.status).to.eq(201);
        createdId = resCreate.body.id;
    });

    it('with recently created user should success', async function() {
        const body = req.generateUserData();
        const res = await req.updateUserDetails(createdId, body);

        expect(res.status).to.eq(200);
        expect(res.body.name).to.eq(body.name);
        expect(res.body.email).to.eq(body.email);
        expect(res.body.gender).to.eq(body.gender);
        expect(res.body.status).to.eq(body.status);
    });

    it('with non exist user should return relevant error message', async function() {
        const body = req.generateUserData();
        const res = await req.deleteUserDetails(999999, body);

        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('Resource not found');
    });

    it('with invalid access token should return relevant error message', async function() {
        const body = req.generateUserData();
        const res = await req.updateUserDetails(createdId, body, 'invalidAccessToken');

        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('Resource not found');
    });
});
