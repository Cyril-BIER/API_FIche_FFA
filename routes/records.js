var express = require('express');
var router = express.Router();

const puppeteer = require('puppeteer');

async function scrapeData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://bases.athle.fr/asp.net/athletes.aspx?base=records&seq=50494257485150494851435650494257');

    const data = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('#divRecord tr')); // Get all the tr elements within #divRecord
        return rows.map(row => {
            const columns = row.querySelectorAll('td.innerDatas'); // Get all td.innerDatas for this row
            if (columns.length > 0) {
                // Assuming the order of td.innerDatas is consistent across rows
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

/* GET users listing. */
router.get('/:numeroLicence', async function (req, res, next) {
    try {
        // Call the scrapeData function
        const scrapedData = await scrapeData();

        // Send the scraped data as the response
        res.json(scrapedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while scraping data');
    }
});

module.exports = router;
