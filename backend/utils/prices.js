const puppeteer = require('puppeteer');
// const { performance } = require('perf_hooks'); // uncomment when testing times

// Options for puppeteer
const args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-infobars',
    '--window-position=0,0',
    '--ignore-certifcate-errors',
    '--ignore-certifcate-errors-spki-list',
    '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36"'
    ];


const scrapeProduct = (async (ingredient) => {
    // Error check the ingredient
    if (!ingredient) {
        return { message: `The argument provided (${ingredient}) is empty.` }
    }

    // Start puppeteer
    const browser = await puppeteer.launch({
        headless: true,
        userDataDir: './cache',
        args,
    });

    // Set user-agent based on system
    const page = await browser.newPage();

    
    // Enable request interceptor
    await page.setRequestInterception(true);

    // Block requests related to images and styles
    page.on('request', request => {
        if (
            request.resourceType() === 'image' || 
            request.resourceType() === 'stylesheet'
        )
            request.abort();
        else
            request.continue();
    });

    // Queries to sort walmart products by
    const popularQuery = '&sort=Popular%3ADESC';

    // Create a new page to walmart
    await Promise.all([
        // Go to the ingredient with the popular query
        page.goto(`https://www.walmart.ca/search?q=${ingredient}${popularQuery}`),
        page.waitForNavigation(),
    ]);
    
    // Perform HTML queries to get all the 'products' on the page
    const items = await page.evaluate(() => {
        const divs = document.querySelectorAll("div[data-automation='grocery-label']");
        return Array.from(divs).map((div => div.parentElement.parentElement.parentElement.children[1].innerText));
    });

    // Initialize JSON for returning ingredients
    const productsInfo = [];

    // Iterate through each product
    for (const item of items){
        // Parse the product to get the price(s) parts
        const itemInfo = item.split('\n');
        const priceParsed = itemInfo.filter(item => {
           return (item.includes('¢') || item.includes('$'));
        });

        // Name of the product always found at zero'th index
        const itemName = itemInfo.filter(item => {
            return item.toLowerCase().includes(ingredient);
        })[0];

        // Add to the array of products available
        productsInfo.push({
            name: itemName,
            price: priceParsed[0],
            ppg: priceParsed[1] ? priceParsed[1] : 'NA',
        });
    }
    
    // Check if the page got blocked
    if (page.url().includes('blocked')){
        // Restart the browser
        await browser.disconnect();
        await scrapeProduct(ingredient);
    }

    // Check if the ingredient was valid
    if (productsInfo.length === 0) {
        await browser.close();
        // Funny error message: When puppeteer gives up it just stops here, otherwise
        // it'll try to keep running until either this is returned or the food
        return { message: `The ingredient: '${ingredient}' is not valid.` }
    }

    return productsInfo[0];
});

// (async () => {
//     const before = performance.now();
//     const p = await scrapeProduct('chocolate');
//     const after = performance.now();
//     console.log(`Call took ${after - before} miliseconds`);
//     console.log(p);
//     process.exit(1);
// })();

module.exports = scrapeProduct;