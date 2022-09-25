const expect = require('chai').expect;
const req = require('../../lib/request');

describe('Create Comment with User Account', function() {
    let resCreate;
    let createdId;
    before(async function () {
        const bodyCreate = req.generateUserData();
        resCreate = await req.createNewUser(bodyCreate);
        expect(resCreate.status).to.eq(201);
        createdId = resCreate.body.id;
    });

    it('with recently created user should success', async function() {
        const comment = req.generateComment();
        const res = await req.createUserComment(createdId, comment);

        console.log(res.body);

        const res2 = await req.getUserComment(createdId);
        console.log(res2.body);
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
