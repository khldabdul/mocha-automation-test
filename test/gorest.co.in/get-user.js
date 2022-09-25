const expect = require('chai').expect;
const req = require('../../lib/request');

describe('Get User', function() {
    let resCreate;
    let createdId;
    before(async function () {
        const bodyCreate = req.generateUserData();
        resCreate = await req.createNewUser(bodyCreate);
        expect(resCreate.status).to.eq(201);
        createdId = resCreate.body.id;
    });

    it('with recently created user should success', async function() {
        const res = await req.getUserDetails(createdId);

        expect(res.status).to.eq(200);
        expect(res.body.name).to.eq(resCreate.body.name);
        expect(res.body.email).to.eq(resCreate.body.email);
        expect(res.body.gender).to.eq(resCreate.body.gender);
        expect(res.body.status).to.eq(resCreate.body.status);
    });

    it('with non exist user should return relevant error message', async function() {
        const res = await req.getUserDetails(999999);
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('Resource not found');
    });
});
