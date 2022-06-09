
# gde-editor

Front end UI for editing Guest Data Extensions(GDE's)

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

 - BoxeverLabs (SpinAir) 
 - PartnerSandbox 
 - SpinGaming 
 - SpinAir - DC
 - SpinFinance 
 - SpinMedia (SpinCom) 
 - SpinShop

(email richard.flynn@sitecore.net to add more)

Send me -> the client key (and API secret)  to add

And also the EXACT string displayed in the UI for that client key, from here:

![enter image description here](https://i.ibb.co/yYGjfK7/Screenshot-2022-06-09-at-12-15-05.png)

e.g. "Partner Sandbox"
