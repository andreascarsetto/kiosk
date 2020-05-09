const CDP = require('chrome-remote-interface');

async function example() {
    let client;
    try {
        // connect to endpoint
        client = await CDP();
        // extract domains
        const {Network, Page,Runtime} = client;
        // setup handlers
        Network.requestWillBeSent((params) => {
            console.log(params.request.url);
        });
        // enable events then start!
     /*   await Network.enable();
        await Page.enable();
        await Page.navigate({url: 'https://WWW.GITHUB.COM'});
        await Page.loadEventFired(); */
        await Runtime.evaluate({expression: "document.getElementById('rss').style.display = 'none'"})
       await Runtime.evaluate({expression: "document.getElementById('weather').style.display = 'none'"})
       await Runtime.evaluate({expression: "document.getElementById('calendar').style.display = 'none'"})
    //    await Runtime.evaluate({expression: "document.getElementById('weather').style.display = 'block'"})
        //await Page.console.
    } catch (err) {
        console.error(err);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

example();