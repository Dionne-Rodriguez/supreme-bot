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
        executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
        headless: false,
        slowMo: 75
    });
    const page = await browser.newPage();
    await page.goto(url)

    const getSupremeLinks = await page.evaluate(() => {
        let newSupremeProductLinks = [];
        let OldSupremeProductLinks = ['https://www.supremenewyork.com/shop/shoes/tfwm0d3tb',
        'https://www.supremenewyork.com/shop/hats/dmbz4ytfx',
        'https://www.supremenewyork.com/shop/jackets/rfc1ir8zo',
        'https://www.supremenewyork.com/shop/jackets/dyupjinrd',
        'https://www.supremenewyork.com/shop/jackets/owi1hbg04',
        'https://www.supremenewyork.com/shop/shirts/qtpkj86ma',
        'https://www.supremenewyork.com/shop/shirts/ov7feyd38',
        'https://www.supremenewyork.com/shop/sweatshirts/jxzscypmb',
        'https://www.supremenewyork.com/shop/sweatshirts/ey2bz0fg7',
        'https://www.supremenewyork.com/shop/sweatshirts/xljctrkau',
        'https://www.supremenewyork.com/shop/tops-sweaters/qpcy4t89v',
        'https://www.supremenewyork.com/shop/tops-sweaters/uk1fsbq4n',
        'https://www.supremenewyork.com/shop/pants/q1i3depsc',
        'https://www.supremenewyork.com/shop/pants/gspaid2rv',
        'https://www.supremenewyork.com/shop/pants/j12wldagx',
        'https://www.supremenewyork.com/shop/hats/gnyemz2tb',
        'https://www.supremenewyork.com/shop/hats/mdps36b02',
        'https://www.supremenewyork.com/shop/hats/v4imdyu2r',
        'https://www.supremenewyork.com/shop/hats/jbnuwprdx',
        'https://www.supremenewyork.com/shop/accessories/t435zxwsi',
        'https://www.supremenewyork.com/shop/skate/whutpe1wr',
        'https://www.supremenewyork.com/shop/skate/bump7gjf4']
        let ul = document.querySelector('#shop-scroller');
        let li = ul.querySelectorAll('li')
            console.log(li);
            
        li.forEach(el => { 
             if (el.childNodes[0].childNodes[0].attributes[0].nodeValue == "new_item_tag"
              && el.className == "shirts" 
              || el.className == "sweatshirts") {                 
                newSupremeProductLinks.push(el.childNodes[0].href)
             }
        });
        
        return newSupremeProductLinks
    })
        .catch(() => console.log("error"));

        console.log("NEW",getSupremeLinks)

    getAvailableSupremeProducts(page,getSupremeLinks);

}
const getAvailableSupremeProducts = async (page, links) => {
  
const purchaseLinks = []
const foundShirt = links.find(element => element.includes("shirts"));
const foundSweatShirt = links.find(element => element.includes("sweatshirts"));
purchaseLinks.push(foundShirt)
purchaseLinks.push(foundSweatShirt)
    
    for (let i = 0; i < purchaseLinks.length; i++) {
        page.goto(purchaseLinks[i]);
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        if (await page.$("input[name=commit]") !== null) {
            await page.click('input[name=commit]'); 
            page.waitForSelector("a[data-no-turbolink]")
        }

        
    }

 await page.click('a[data-no-turbolink]'); 


 enterPaymentInfo(page)
    return null

}

async function enterPaymentInfo(page){
    page.waitForSelector('#order_billing_name')
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




