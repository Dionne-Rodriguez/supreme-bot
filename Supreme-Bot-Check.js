process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const puppeteer = require('puppeteer')





//arg 1: Category arg 2: product name
scraperProduct("shirts")

async function scraperProduct(category, productName) {
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
        headless: false,
        //userDataDir: "/Users/Dionne/Library/Application\ Support/Google/Chrome",
        slowMo: 200
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});
    await page.goto(`https://www.supremenewyork.com/shop/all/${category}`)

            await page.evaluate(() => {
                [...document.querySelectorAll('.name-link')].find(element => element.textContent.includes("Hooded Shadow Plaid Shirt")).click();
              });

             await page.waitForSelector('input[name="commit"]', {
                visible: true,
              });
              await page.$eval('input[name="commit"]', elem => elem.click())
              await page.click('a[data-no-turbolink]'); 
             
              enterPaymentInfo(page)              
          
          
}

async function enterPaymentInfo(page){
    page.waitForSelector('#order_billing_name')

    page.waitForSelector('#credit_card_year')

    await page.evaluate(() => {
        document.querySelector('#order_billing_name').value = "Joshua Perez";
        document.querySelector('#order_email').value = "Boysforlife0@icloud.com";
        document.querySelector('#order_tel').value = "7815840334";
        document.querySelector('#bo').value = "7 Rhodes ave"
        document.querySelector('#oba3').value = "3";
        document.querySelector('#order_billing_zip').value = "01904";
        document.querySelector('#order_billing_city').value = "Lynn";
        document.querySelector('#order_billing_state').value = "MA";
        document.querySelector('#rnsnckrn').value = "4145180003483623";
        document.querySelector('#credit_card_month').value = "07";
        document.querySelector('#credit_card_year').value = "2023";
        document.querySelector('#orcer').value = "121";
        document.querySelector('#order_terms').parentElement.click()
      });

}




