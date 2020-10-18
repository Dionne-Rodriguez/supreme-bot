const puppeteer = require('puppeteer')


scraperProduct("https://www.supremenewyork.com/shop")

async function scraperProduct(url) {
        // Goes to the page
    const browser = await puppeteer.launch({headless: false,
    slowMo: 250});
    const page = await browser.newPage();
    await page.goto(url)




 await page.evaluate(() => {

        let data = [];
        let ul = document.querySelector('#shop-scroller');
        let li = ul.querySelectorAll('li')
        // let a = li.getElementsByTagName("a")

        li.forEach(el => {
            data.push(el.childNodes[0].href)
            // console.log("!!!!!",el.childNodes[0].href)
        });

        console.log(data);
        
        
    })
    .catch(() => console.log("error"));

    
    
   
    // await browser.close();
}