process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const puppeteer = require('puppeteer')
const nodeMailer = require('nodemailer')
const keys = require("./config/keys")

const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: keys.emailFrom,
        pass: keys.emailPass
    },
})

scraperProduct("https://www.supremenewyork.com/shop")

async function scraperProduct(url) {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 250
    });
    const page = await browser.newPage();
    await page.goto(url)

    const getSupremeLinks = await page.evaluate(() => {

        let data = [];
        let ul = document.querySelector('#shop-scroller');
        let li = ul.querySelectorAll('li')

        li.forEach(el => {
            // if (el.childNodes[0].childNodes[0].attributes[0].nodeValue == "new_item_tag") {
                data.push(el.childNodes[0].href)
            // }
        });
        return data
    })
        .catch(() => console.log("error"));

    getAvailableSupremeProducts(page,getSupremeLinks);

    console.log(getSupremeLinks)


    // await browser.close();
}
const getAvailableSupremeProducts = async (page, links) => {
    links = [
        'https://www.supremenewyork.com/shop/jackets/xni1oh9ca',
        'https://www.supremenewyork.com/shop/jackets/zvj0wbe51',
      ]
    for (let i = 0; i < links.length; i++) {
        page.goto(links[i])
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        //evaluates the page context
        if (await page.$("input[name=commit]") !== null) {
            // const form = await page.$('#cart-addf');
            await page.click('input[name=commit]'); 
            page.waitForSelector("a[data-no-turbolink]")
            //await page.waitForNavigation();
            //await form.evaluate( form => form.click())
           // page.click("input[name=commit]")

        }
        
    }


 await page.click('a[data-no-turbolink]'); 
enterPaymentInfo(page)

    
    return null

}

async function enterPaymentInfo(page){
    page.waitForSelector('#order_billing_name')
    await page.evaluate(() => {
        document.querySelector('#order_billing_name').value = "Dave";
        document.querySelector('#order_email').value = "Dave@gmail.com";
        document.querySelector('#order_tel').value = "7361263728";
        document.querySelector('#bo').value = "128 Walnut St."
        document.querySelector('#oba3').value = "3";
        document.querySelector('#order_billing_zip').value = "01905";
        document.querySelector('#order_billing_city').value = "Sin City";
        document.querySelector('#order_billing_state').value = "MA";
        document.querySelector('#rnsnckrn').value = "129327341928";
        document.querySelector('#credit_card_month').value = "06";
        document.querySelector('#credit_card_year').value = "2023";
        document.querySelector('#orcer').value = "284";
        document.querySelector('#order_terms').parentElement.click()
        // document.querySelector('#b').value = b;
        // document.querySelector('#c').click();
      });
    // await page.type('input[name=order[billing_name]]', 'test comment', {delay: 20})
    // await page.type('input[name=order[email]]', 'test comment', {delay: 20})
    // await page.type('input[name=order[tel]]', 'test comment', {delay: 20})
    // await page.type('input[name=order[billing_address]]', 'test comment', {delay: 20})
    // await page.type('input[name=order[billing_address_2]]', 'test comment', {delay: 20})
    // await page.type('input[name=orderorder[billing_zip]]', 'test comment', {delay: 20})

}

function sendPurchaseNotification(){

}



