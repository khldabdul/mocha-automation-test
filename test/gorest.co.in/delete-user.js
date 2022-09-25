const expect = require('chai').expect;
const req = require('../../lib/request');

describe('Delete User', function() {
    let resCreate;
    let createdId;
    before(async function () {
        const bodyCreate = req.generateUserData();
        resCreate = await req.createNewUser(bodyCreate);
        expect(resCreate.status).to.eq(201);
        createdId = resCreate.body.id;
    });

    it('with recently created user should success', async function() {
        const res = await req.deleteUserDetails(createdId);

        expect(res.status).to.eq(204);
    });

    it('with non exist user should return relevant error message', async function() {
        const res = await req.deleteUserDetails(999999);

        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('Resource not found');
    });
});
