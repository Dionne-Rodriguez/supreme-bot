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
        slowMo: 75
    });
    const page = await browser.newPage();
    await page.goto(url)


    //refresh the page until the new tags are not on the previous stored new tags
    //when the new tags don't match with the old new tags stop the refresh
    //grab the first 5 product links
    //procede with the function
   

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

        li.forEach(el => { 
             if (el.childNodes[0].childNodes[0].attributes[0].nodeValue == "new_item_tag") {
                 console.log("CHECKING");
                 
                newSupremeProductLinks.push(el.childNodes[0].href)
             }
        });
        
        const allEqual = arr => arr.every( v => v === arr[0] )
        allEqual( [1,1,1,1] )
        // if(newSupremeProductLinks === letOldSupremeProductLinks) {
        //     console.log("no new products found");
        //     page.reload({ waitUntil: 'networkidle0' })
             
        // }
        //  else {
        //      console.log("found new Products");
             
        //     return newSupremeProductLinks
        // }

        return "no new products found"
    })
        .catch(() => console.log("error"));

        console.log("NEW",getSupremeLinks)

    //getAvailableSupremeProducts(page,getSupremeLinks);

    


    // await browser.close();
}
const getAvailableSupremeProducts = async (page, links) => {
    // links = [
    //     'https://www.supremenewyork.com/shop/jackets/xni1oh9ca',
    //     'https://www.supremenewyork.com/shop/jackets/zvj0wbe51',
    //   ]
    let reducedAmountsOfLinks = links.slice(0,5)
    console.log("SLICED LINKS", reducedAmountsOfLinks);
    
    for (let i = 0; i < reducedAmountsOfLinks.length; i++) {
        page.goto(links[i])
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

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
console.log("HEREEE");

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



