const mysql = require('../lib/mysql');


const addNews = async (params) => {
    let matchData;
    // Fetching tourId from matchId
    if(params.matchId){
        const statement = 'SELECT * from matches where matches.id = ?;';
        const parameters = [params.matchId];
        matchData = await mysql.query(statement, parameters);
        if(!matchData){
            // throwing error when match not exist
            throw new Error('Invalid parameter submitted: matchId');
        }
    }
    const tourId = matchData ? matchData[0].tourId : params.tourId;
    const statement = 'insert into news(title, description, sportId, tourId, matchId) ' +
        ' SELECT ?, ?, tours.sportId, tours.id, ? from tours where tours.id=?;';
    const parameters = [params.title, params.description, params.matchId, tourId];
    return await mysql.query(statement, parameters);
}
const getNewsByTourId = async params =>{
    const statement = `select * from news where news.tourId = ?  LIMIT ? OFFSET ?`
    const parameters = [params.tourId, parseInt(params.page_size), (parseInt(params.page_no) - 1)
    * parseInt(params.page_size)];
    return await mysql.query(statement, parameters);
}
const getNewsByMatchId = async params =>{
    const statement = `select * from news where news.matchId = ?  LIMIT ? OFFSET ?`
    const parameters = [params.matchId, parseInt(params.page_size), (parseInt(params.page_no) - 1)
    * parseInt(params.page_size)];
    return await mysql.query(statement, parameters);
}
const getNewsBySportId = async params =>{
    const statement = `select * from news where news.sportId = ?  LIMIT ? OFFSET ?`
    const parameters = [params.sportId, parseInt(params.page_size), (parseInt(params.page_no) - 1)
    * parseInt(params.page_size)];
    return await mysql.query(statement, parameters);
}
module.exports = {
    addNews: addNews,
    getNewsByTourId:getNewsByTourId,
    getNewsByMatchId: getNewsByMatchId,
    getNewsBySportId: getNewsBySportId
}