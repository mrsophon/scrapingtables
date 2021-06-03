const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: false });
const cheerio = require("cheerio");

const param = process.argv.slice(2, 3).toString().trim().toLowerCase();

nightmare
  .goto("https://codequiz.azurewebsites.net/")
  .click("input[value='Accept']")
  .wait("body")
  .evaluate(function () {
    return document.body.innerHTML;
  })
  .end()
  .then(function (body) {
    const $ = cheerio.load(body);
    $("body > table > tbody > tr").each((index, element) => {
      if (index === 0) return true;
      const tds = $(element).find("td");
      const fund = $(tds[0]).text().trim().toLowerCase();
      if (fund === param) {
        const nav = $(tds[1]).text();
        console.log(nav);
      }
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
