const News = require('../controllers/news');
const Joi = require("joi")

// news schema for post request
const newsSchema = Joi.object({
    title: Joi.string().required().min(5).max(50),
    description: Joi.string().required().min(5).max(200),
    matchId: Joi.number().integer().optional(),
    tourId: Joi.number().integer().optional(),
}).xor("matchId", "tourId"); // one of them is required for news creation

module.exports = function(app) {
    app.route('/news').post(async (req, res, next) => {
        try {
            const {error} = newsSchema.validate(req.body);
            if (error){
                return res.status(400).json({"errorMessage": error.details[0].message})
            }
            return res.json(await News.addNews(req.body));
        } catch (err) {
            return next(err);
        }
    });
    app.route('/news/match').get(async (req, res, next) => {
        try {
            let params = req.query;
            return res.json(await News.getNewsByMatchId(params));
        } catch (err) {
            return next(err);
        }
    });
    app.route('/news/tour').get(async (req, res, next) => {
        try {
            let params = req.query;
            return res.json(await News.getNewsByTourId(params));
        } catch (err) {
            return next(err);
        }
    });
    app.route('/news/sport').get(async (req, res, next) => {
        try {
            let params = req.query;
            return res.json(await News.getNewsBySportId(params));
        } catch (err) {
            return next(err);
        }
    });
}