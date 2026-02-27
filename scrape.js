const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [42,43,44,45,46,47,48,49,50,51];
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    await page.waitForSelector("table");

    const sum = await page.$$eval("table td", cells =>
      cells.reduce((acc, cell) => {
        const num = parseFloat(cell.innerText);
        return acc + (isNaN(num) ? 0 : num);
      }, 0)
    );

    grandTotal += sum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
