
# Sitecore CDP Guest Profile Editor

Front end UI for adding Guests:
![enter image description here](https://i.ibb.co/8gDKz2k/Screenshot-2022-08-17-at-14-25-25.png)


And front end UI for adding and editing Guest Data Extensions(GDE's)

https://doc.sitecore.com/cdp/en/developers/sitecore-customer-data-platform--data-model-2-1/sitecore-cdp-guest-data-extension-model-functions-rest-api.html

 
 
# Video tutorial

  
Watch: https://sitecore.box.com/s/6s3xg2ory7secjmpibcqarqbcqzcens3


# Or read:

  

This is a little script which allows you do edit (add & remove) Guest Data Extensions from the front-end Sitecore CDP app UI.

  

It adds these three buttons to the properties screen of a Guest profile:

![enter image description here](https://i.ibb.co/WzzjxQ1/Screenshot-2022-04-25-at-14-24-12.png)


Additionally if the extension name is "ext" and the key is "default" as per 2.1 DataExtensions API docs...

Then that extension can be edited 'in place' via the UI augmentations highlighted below

![enter image description here](https://i.ibb.co/1mNwxcW/Screenshot-2022-06-09-at-12-10-44.png)

Just edit the table as required and "Save Changes"

  

# How do I install it?

  

Make a new tampermonkey script with this src code: https://raw.githubusercontent.com/rjzflynnbx/gde-editor/main/tampermonkey-script.js

  

After that - you need to be in debug mode in the Sitecore CDP app.

  

To enable debug mode append "&debug=true" to the URL and refresh the page twice.

  

That's it you're ready to go.

  


  

# What clientKeys are supported?

    wjtc2eog1lvueo72kts3mn1ean0nentz: 'Boxever Labs (Spinair)',
        psfu6uh05hsr9c34rptlr06dn864cqrx: 'Partner Sandbox',
        pqsGAMEJ9jsRlJMQPTrnpk0cGxD4ab70: "Spin Gaming",
        pqsDATA3lw12v5a9rrHPW1c4hET73GxQ: "Spinair - DC",
        pqsFinGP4nW3iqC4JzgRMGZMgODLuDVM: "SpinFinance",
        pqsMedIa6PvIs50quSIOAPHcL0TJTQpk: "SpinMedia",
        pqsSIOPAxhMC9zJLJSZNFURPNqALIFwd: "SpinShop",
        pqsHoMeZqwc3fXgLCQs1p21ImhAr6tPL: "SpinHome",
        dpsbx91fh7b0ve3qbfuoa0f7brme513i: "PLAY! Summit",
        sise3apsjuzewfkne2rmuuedwflq2ruc: "Sitecore Sales Engineering 3 AP",
        sise1aprs042qjutf9b9p94lx31bk8n8: "Sitecore Sales Engineering 1 AP"

Eemail richard.flynn@sitecore.net to add more clients.

Send me:

 - the client key
 - API secret 
 - tenant region (1 of US,EU,AUS)

And also the EXACT string displayed in the UI for that client key, from here:

![enter image description here](https://i.ibb.co/yYGjfK7/Screenshot-2022-06-09-at-12-15-05.png)

e.g. "Partner Sandbox"
