var express = require('express');
var router = express.Router();

const {getPB, getPBbyLicenceNumber} = require('../scrapping/athletes')

router.get('/', async function (req, res) {
    try {
        let scrapedData
        if(req.query.id != null) {
            scrapedData = await getPB(req.query.id);
        }else{
            if(req.query.licence != null){
                scrapedData = await getPBbyLicenceNumber(req.query.licence);
            }else{
                scrapedData = "Veuillez renseigner le champ id ou licence"
            }
        }
        res.json(scrapedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while scraping data');
    }
});


module.exports = router;
