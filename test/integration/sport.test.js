const request = require('supertest');
const { app } = require('../../index');
const Sport = require('../../src/models/sport');
const sinon = require('sinon');


describe('GET /sport/tour/match ', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(done);
    });

    afterAll((done) => {
        server.close(done);
    });
    it('should return 200 and the expected result', async () => {
        const expectedResult = [{
            sportName: "cricket",
            tourName: "IPL2023",
            matchName: "RCB vs GT",
            matchId: 1,
            matchFormat: "T20",
            matchStartTime: "2023-04-09 00:00:00"
        },{
            sportName: "football",
            tourName: "Super ball2002",
            matchName: "FL vs NY",
            matchId: 2,
            matchFormat: "American football",
            matchStartTime: "2023-04-09 00:00:00"
        }
        ]
        const expectedResponse = {
            "cricket": {
                "IPL2023": [
                    {
                        "matchId": 1,
                        "matchName": "RCB vs GT",
                        "matchFormat": "T20",
                        "matchStartTime": "2023-04-09 00:00:00"
                    }
                ]
            },
            "football": {
                "Super ball2002": [
                    {
                        "matchId": 2,
                        "matchName": "FL vs NY",
                        "matchFormat": "American football",
                        "matchStartTime": "2023-04-09 00:00:00"
                    }
                ]
            }
        }
        const stub = sinon.stub(Sport, 'getAllSportsToursAndMatches').resolves(expectedResult);
        const response = await request(app).get('/sport/tour/match');
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(expectedResponse)
        stub.restore();
    });


});