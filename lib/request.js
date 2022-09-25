const user = require('../fixture/user.json');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const faker = require('@faker-js/faker');

const baseUrl = 'https://gorest.co.in';
const userUrl = '/public/v2/users';

function generateUserData(customBody) {
    return {
        name: faker.faker.name.fullName(),
        email: faker.faker.internet.email(),
        gender: Math.random() <= 0.5 ? 'male': 'female',
        status: Math.random() <= 0.5 ? 'active': 'inactive',
        ...customBody
    }
}

function generateToDo() {
    return {
        title: faker.faker.random.words(),
        due_on: faker.faker.date.future(1),
        status: 'to do'
    }
}

function generateComment() {
    return {
        comments: faker.faker.random.words(10)
    }
}

function generatePost() {
    return {
        title: faker.faker.random.words(),
        body: faker.faker.random.words(15)
    }
}

async function getUserDetails(userId, accessToken = user.accessToken) {
    const res = await chai
        .request(baseUrl)
        .get(userUrl + '/' + userId)
        .set({
            Authorization: 'Bearer ' + accessToken
        })
        .send();
    return {
        res: res,
        body: res.body,
        status: res.status
    }
}

async function createNewUser(bodyRequest, accessToken = user.accessToken) {
    const res = await chai
        .request(baseUrl)
        .post(userUrl)
        .set({
            Authorization: 'Bearer ' + accessToken
        })
        .send(bodyRequest);
    return {
        res: res,
        body: res.body,
        status: res.status
    }
}

async function updateUserDetails(userId, bodyRequest, accessToken = user.accessToken) {
    const res = await chai
        .request(baseUrl)
        .put(userUrl + '/' + userId)
        .set({
            Authorization: 'Bearer ' + accessToken
        })
        .send(bodyRequest);
    return {
        res: res,
        body: res.body,
        status: res.status
    }
}

async function deleteUserDetails(userId, accessToken = user.accessToken) {
    const res = await chai
        .request(baseUrl)
        .delete(userUrl + '/' + userId)
        .set({
            Authorization: 'Bearer ' + accessToken
        })
        .send();
    return {
        res: res,
        body: res.body,
        status: res.status
    }
}

async function createUserPost(userId, bodyRequest, accessToken = user.accessToken) {
    const res = await chai
        .request(baseUrl)
        .post(`${userUrl}/${userId}/posts`)
        .set({
            Authorization: 'Bearer ' + accessToken
        })
        .send(bodyRequest);
    return {
        res: res,
        body: res.body,
        status: res.status
    }
}

async function getUserComment(userId, accessToken = user.accessToken) {
    const res = await chai
        .request(baseUrl)
        .get(`${userUrl}/${userId}/comments`)
        .set({
            Authorization: 'Bearer ' + accessToken
        })
        .send();
    return {
        res: res,
        body: res.body,
        status: res.status
    }
}

async function createUserComment(userId, bodyRequest, accessToken = user.accessToken) {
    const res = await chai
        .request(baseUrl)
        .post(`${userUrl}/${userId}/comments`)
        .set({
            Authorization: 'Bearer ' + accessToken
        })
        .send(bodyRequest);
    return {
        res: res,
        body: res.body,
        status: res.status
    }
}

async function createUserTodo(userId, bodyRequest, accessToken = user.accessToken) {
    const res = await chai
        .request(baseUrl)
        .post(`${userUrl}/${userId}/todos`)
        .set({
            Authorization: 'Bearer ' + accessToken
        })
        .send(bodyRequest);
    return {
        res: res,
        body: res.body,
        status: res.status
    }
}

module.exports = {
    generateUserData,
    generateToDo,
    generateComment,
    generatePost,
    getUserDetails,
    createNewUser,
    updateUserDetails,
    deleteUserDetails,
    createUserPost,
    getUserComment,
    createUserComment,
    createUserTodo
}