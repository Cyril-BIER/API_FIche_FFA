var express = require('express');
var router = express.Router();

const getPB = require('../scrapping/athletes')




router.get('/:identifiant', async function (req, res, next) {
    try {
        const scrapedData = await getPB(req.params.identifiant);
        res.json(scrapedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while scraping data');
    }
});

module.exports = router;
