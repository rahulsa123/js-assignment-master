const fs = require('fs');
const path = require('path');

const fileList = function(dir) {
	return fs.readdirSync(dir).reduce((list, file) => {
		const name = path.join(dir, file);
		const isDir = fs.statSync(name).isDirectory();
		return list.concat(isDir ? fileList(name) : [name]);
	}, []);
};

function getValidPaginationData(page_size, page_no, MAX_PAGE_SIZE) {
	if (page_size && !isNaN(page_size) && page_size > 0 && page_size < MAX_PAGE_SIZE) {
		page_size = parseInt(page_size)
	} else {
		page_size = MAX_PAGE_SIZE
	}
	if (page_no && !isNaN(page_no)) {
		page_no = parseInt(page_no);
	} else {
		page_no = 1
	}
	return {page_size, page_no}
}
module.exports = {
	fileList,
	getValidPaginationData
};
