var express = require('express');
var router = express.Router();

const puppeteer = require('puppeteer');

const strToHex = require('../utils/stringTohex')

async function scrapeData(id) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://bases.athle.fr/asp.net/athletes.aspx?base=records&seq=${strToHex(id)}`);

    const data = await page.evaluate(() => {
        // Select the first table within #divRecord
        const table = document.querySelector('#divRecord table');
        if (!table) return []; // Return an empty array if no table is found
        
        const rows = Array.from(table.querySelectorAll('tr'));
        // Skip the first row if it is a header row
        return rows.slice(1).map(row => {
            const columns = row.querySelectorAll('td.innerDatas');
            if (columns.length > 0) {
                return {
                    epreuve: columns[0].innerText.trim(),
                    performance: columns[1].innerText.trim(),
                    category: columns[2].innerText.trim(),
                    club: columns[3].innerText.trim(),
                    ligue: columns[4].innerText.trim(),
                    lieu: columns[5].innerText.trim(),
                    date: columns[6].innerText.trim(),
                };
            }
            return null; // In case there are rows that do not match the expected structure
        }).filter(row => row !== null); // Remove any null entries (e.g., header rows)
    });

    await browser.close();
    return data;
}


router.get('/:identifiant', async function (req, res, next) {
    try {
        const scrapedData = await scrapeData(req.params.identifiant);
        res.json(scrapedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while scraping data');
    }
});

module.exports = router;
