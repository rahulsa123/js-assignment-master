const News = require("../models/news");
const {getValidPaginationData} = require("../lib/helper");
const MAX_PAGE_SIZE = 5;
const addNews = async (reqBody) => {
    return await News.addNews(reqBody)
}
// const getAllNews = async () => {
//     return await News.getAllNews();
// }

const getNewsByTourId = async params =>{
    const {tourId, page_no, page_size} = params;
    if(!tourId){
        throw new Error('Missing required parameter: tourId')
    }
    const paginationData = getValidPaginationData(page_size, page_no, MAX_PAGE_SIZE);
    params.page_no = paginationData.page_no;
    params.page_size = paginationData.page_size;

    return await  News.getNewsByTourId(params);
}
const getNewsByMatchId = async params =>{
    const {matchId, page_no, page_size} = params;
    if(!matchId){
        throw new Error('Missing required parameter: matchId')
    }
    const paginationData = getValidPaginationData(page_size, page_no, MAX_PAGE_SIZE);
    params.page_no = paginationData.page_no;
    params.page_size = paginationData.page_size;

    return await  News.getNewsByMatchId(params);
}
const getNewsBySportId = async params =>{
    const {sportId, page_no, page_size} = params;
    if(!sportId){
        throw new Error('Missing required parameter: sportId')
    }
    const paginationData = getValidPaginationData(page_size, page_no, MAX_PAGE_SIZE);
    params.page_no = paginationData.page_no;
    params.page_size = paginationData.page_size;

    return await  News.getNewsBySportId(params);
}
module.exports = {
    addNews: addNews,
    // getAllNews: getAllNews,
    getNewsByTourId: getNewsByTourId,
    getNewsByMatchId: getNewsByMatchId,
    getNewsBySportId: getNewsBySportId
}