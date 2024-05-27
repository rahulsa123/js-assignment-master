const request = require('supertest');
const { app } = require('../../index');
const Tour = require('../../src/models/tour');
const sinon = require('sinon');

describe('GET /tour/matches ', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(done);
    });

    afterAll((done) => {
        server.close(done);
    });
    it('should return 200 and the expected result', async () => {
        const expectedResult = [{
            tourId: 1,
            tourName: "IPL 2023",
            sportId: 1,
            tourStartTime: "2023-04-09 00:00:00",
            tourEndTime: "2023-04-09 00:00:00",
            matchName: "GT VS RCB",
            matchFormat: "T20",
            matchStartTime: "2023-04-09 00:00:00",
            matchEndTime: "2023-04-09 00:00:00"
        }]
        const stub = sinon.stub(Tour, 'getMatchesByTourName').resolves(expectedResult);
        const response = await request(app).get('/tour/matches').query({name:expectedResult[0].tourName});
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(expectedResult);
        stub.restore();
    });
    it('should return 500 if name is not provided', async () => {
        const response = await request(app).get('/tour/matches');
        expect(response.status).toBe(500);
    });
    it('should return 200 and the expected result when invalid page_size submitted', async () => {
        const expectedResult = [{
            tourId: 1,
            tourName: "IPL 2023",
            sportId: 1,
            tourStartTime: "2023-04-09 00:00:00",
            tourEndTime: "2023-04-09 00:00:00",
            matchName: "GT VS RCB",
            matchFormat: "T20",
            matchStartTime: "2023-04-09 00:00:00",
            matchEndTime: "2023-04-09 00:00:00"
        }]
        const stub = sinon.stub(Tour, 'getMatchesByTourName').resolves(expectedResult);
        const response = await request(app).get('/tour/matches').query({name:expectedResult[0].tourName, page_size:-1});
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(expectedResult);
        stub.restore();
    });

});