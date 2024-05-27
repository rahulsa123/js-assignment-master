const request = require('supertest');
const { app } = require('../../index');
const News = require('../../src/models/news');
const sinon = require('sinon');
const Tour = require("../../src/models/tour");

describe('POST /news ', () => {
    let server;
    beforeAll((done) => {
        server = app.listen(done);
    });
    afterAll((done) => {
        server.close(done);
    });
    it('should return 400 when title is missing in request body', async () => {
        const response = await request(app).post('/news').send({});
        expect(response.status).toBe(400);
        expect(response.body.errorMessage).toBe('"title" is required')
    });
    it('should return 400 when description is missing in request body', async () => {
        const response = await request(app).post('/news').send({title:"News title"});
        expect(response.status).toBe(400);
        expect(response.body.errorMessage).toBe('"description" is required')
    });
    it('should return 400 when matchId or tourId both are missing in request body', async () => {
        const response = await request(app).post('/news').send({title:"News title", description:"News description"});
        expect(response.status).toBe(400);
        expect(response.body.errorMessage).toContain('matchId')
        expect(response.body.errorMessage).toContain('tourId')
    });
    it('should return 500 when matchId is not present inside db', async () => {
        const stub = sinon.stub(News, 'addNews').throws(new Error('Invalid parameter submitted: matchId'));
        const response = await request(app).post('/news').send({title:"News title", description:"News description", matchId:1});
        expect(response.status).toBe(500);
        stub.restore()
    });
    it('should return 200 when matchId/tourId is valid', async () => {
        const stub = sinon.stub(News, 'addNews').resolves({});
        const withMatchIdResponse = await request(app).post('/news').send({title:"News title", description:"News description", matchId:1});
        expect(withMatchIdResponse.status).toBe(200);
        const withTourIdResponse = await request(app).post('/news').send({title:"News title", description:"News description", tourId:1});
        expect(withTourIdResponse.status).toBe(200);
        stub.restore()
    });
});
describe('GET /news ', () => {
    let server;
    beforeAll((done) => {
        server = app.listen(done);
    });
    afterAll((done) => {
        server.close(done);
    });
    it('/match should return 500 when matchId is not present', async () => {
        const response = await request(app).get('/news/match').query({});
        expect(response.status).toBe(500);
    });
    it('/match should return 200 with expected response when page_size is invalid', async () => {
        const expectedResponse = [
            {
                "id": 2,
                "title": "IPL 2023 GT VS RCB Result",
                "description": "In ipl 2023 GT win against RCB with 3 wicket",
                "sportId": 1,
                "tourId": 1,
                "matchId": 1,
                "recUpdatedAt": "2024-05-26T08:01:31.000Z",
                "createdAt": "2024-05-26T08:01:31.000Z"
            }
        ]
        const stub = sinon.stub(News, 'getNewsByMatchId').resolves(expectedResponse);
        const response = await request(app).get('/news/match').query({matchId:1, page_size:-1});
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(expectedResponse);
        stub.restore()
    });
    it('/tour should return 500 when tourId is not present', async () => {
        const response = await request(app).get('/news/tour').query({});
        expect(response.status).toBe(500);
    });
    it('/tour should return 200 with expected response when page_size is invalid', async () => {
        const expectedResponse = [
            {
                "id": 2,
                "title": "IPL 2023 GT VS RCB Result",
                "description": "In ipl 2023 GT win against RCB with 3 wicket",
                "sportId": 1,
                "tourId": 1,
                "matchId": 1,
                "recUpdatedAt": "2024-05-26T08:01:31.000Z",
                "createdAt": "2024-05-26T08:01:31.000Z"
            }
        ]
        const stub = sinon.stub(News, 'getNewsByTourId').resolves(expectedResponse);
        const response = await request(app).get('/news/tour').query({tourId:1, page_size:-1});
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(expectedResponse);
        stub.restore()
    });
    it('/sport should return 500 when sportId is not present', async () => {
        const response = await request(app).get('/news/sport').query({});
        expect(response.status).toBe(500);
    });
    it('/sport should return 200 with expected response when page_size is invalid', async () => {
        const expectedResponse = [
            {
                "id": 2,
                "title": "IPL 2023 GT VS RCB Result",
                "description": "In ipl 2023 GT win against RCB with 3 wicket",
                "sportId": 1,
                "tourId": 1,
                "matchId": 1,
                "recUpdatedAt": "2024-05-26T08:01:31.000Z",
                "createdAt": "2024-05-26T08:01:31.000Z"
            }
        ]
        const stub = sinon.stub(News, 'getNewsBySportId').resolves(expectedResponse);
        const response = await request(app).get('/news/sport').query({sportId:1, page_size:-1});
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(expectedResponse);
        stub.restore()
    });
});