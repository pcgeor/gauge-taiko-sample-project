/* globals gauge*/
"use strict";
const { openBrowser,write, closeBrowser, goto, press, screenshot, text, focus, textBox, toRightOf, into, near, above, click, button, link } = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({ headless: headless })
});

afterSuite(async () => {
    await closeBrowser();
});

gauge.screenshotFn = async function() {
    return await screenshot({ encoding: 'base64' });
};

step("Goto getgauge github page", async () => {
    await goto('https://github.com/getgauge');
});

step("Search for <query>", async (query) => {
    await focus(textBox(toRightOf('Pricing')))
    await write(query);
    await press('Enter');
});

step("Page contains <content>", async (content) => {
    assert.ok(await text(content).exists());
});

/* Added the  custom step implementation */

step("Navigate to <website>", async(website) => {
    await goto(website);
  
});

step("Login to <website> with <username> and <password>", async(website,username,password) => {
    await goto(website);
    await write(username,into(textBox(above("Password"))))
    //await write(username, $("#user-name"));
    //await write(username,into(textBox($("#user-name"))));
    //await write(username,into(textBox("Username")));
    //await write(username,into(textBox(near("Login"))))
    //await write(password, $("#password"));
    await write(password,into(textBox(near("Login"))))
    await click(button("LOGIN"));    
   
});

step("Select <Items>",async (Items) => {
         
    await click(Items);
    await click("ADD TO CART");
    await click("BACK");

})

step("Remove <Items>",async (Items) => {
         
    await click(Items);
    await click("REMOVE");
    await click("BACK");

})

step("Checkout",async () => {
    //await click($('#shopping_cart_container'));   
    await goto('https://www.saucedemo.com/cart.html')
    await click("CHECKOUT");

})