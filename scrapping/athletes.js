/**
 * Functions to scrape the base.athle.fr profile of an athlete
 */
const puppeteer = require('puppeteer');

const strToHex = require('../utils/stringTohex')

/**
 * Allows to get the DB ID of the athlete corresponding to the licence number given in parameter 
 * @param {*} licenceNumber 
 */
async function getId(licenceNumber) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let year = new Date().getFullYear();
    let id = null;
    while (id == null && year >= 2004) {
        await page.goto(`https://bases.athle.fr/asp.net/liste.aspx?frmpostback=true&frmbase=resultats&frmmode=1&frmespace=0&frmsaison=${year}&frmlicence=${licenceNumber}`)

        id = await page.evaluate(() => {
            const link = document.querySelector('a[href*="bddThrowAthlete"]');

            if (link) {
                const href = link.getAttribute('href');
                const match = href.match(/bddThrowAthlete\('resultats',\s*(\d+),\s*\d+\)/);
                return match ? match[1] : null;
            }
            return null;
        });
        year = year - 1;
    }

    return id;
}

/**
 * Allows to get PBs of the athlete provided in parameter
 * @param {*} id 
 * @returns 
 */
async function getPB(id) {
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

/**
 * Allows to get PBs of the athlete corresponding to the licence number provided in parameter
 * @param {*} licenceNumber 
 */
async function getPBbyLicenceNumber(licenceNumber) {
    const id = await getId(licenceNumber)
    if (id == null ) return "Aucune donnée trouvée pour ce numéro de licence"
    return await getPB(id)
}

module.exports = {
    getId,
    getPB,
    getPBbyLicenceNumber
}