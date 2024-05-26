const Tour = require('../models/tour');

const getAllTours = async () => {
    return await Tour.getAllTours();
}

const getMatchesByTourName = async params => {
    const MAX_PAGE_SIZE = 5;
    const { name, page_size, page_no } = params;

    if (!name) {
        throw new Error('Missing required parameter: name');
    }
    if(page_size && !isNaN(page_size) && page_size>0 && page_size<MAX_PAGE_SIZE){
        params.page_size = parseInt(page_size)
    }else{
        params.page_size = MAX_PAGE_SIZE
    }
    if(page_no && !isNaN(page_no) ){
        params.page_no = parseInt(page_no);
    }else{
        params.page_no = 1
    }
    return await Tour.getMatchesByTourName(params);
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName
}