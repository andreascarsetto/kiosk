const CDP = require('chrome-remote-interface');
const express = require("express");
var app = express();

async function changeDisplayStyle(style) {
    let client;
    try {
        client = await CDP();
        const {Network, Page,Runtime} = client;
        await Runtime.enable();
        await Runtime.evaluate({expression: "document.getElementsByTagName('header')[0].style.display = '"+style+"'"})
        await Runtime.evaluate({expression: "document.getElementsByTagName('footer')[0].style.display = '"+style+"'"})
        await Runtime.evaluate({expression: "document.getElementById('rss').style.display = '"+style+"'"})
    } catch (err) {
        console.error(err);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

app.listen(3000, () => {
    console.log("Server running on port 3000");
   });

app.get("/changeStyle/:style", (req, res, next) => {
    changeDisplayStyle(req.params.style).then(() => {
        res.send("OK")
      });
});
