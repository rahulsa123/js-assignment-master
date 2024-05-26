const mysql = require('../lib/mysql');

const getAllTours = async () => {
    const statement = 'select * from tours;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getMatchesByTourName = async params => {
    // Instead of using left join using inner join.
    // Instead of using * giving alias name to all required column.
    const statement = 'select tours.id as tourId, ' +
        'tours.name as tourName, ' +
        'tours.sportId as sportId, ' +
        'tours.startTime as tourStartTime, ' +
        'tours.endTime as tourEndTime, ' +
        'matches.name as matchName, ' +
        'matches.format as matchFormat, ' +
        'matches.startTime as matchStartTime, ' +
        'matches.endTime as matchEndTime ' +
        ' from matches join tours on matches.tourId = tours.id where tours.name = ? ' +
        'LIMIT ? OFFSET ?';
    const parameters = [params.name, parseInt(params.page_size), parseInt(params.page_no - 1)
    * parseInt(params.page_size)];

    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName
}