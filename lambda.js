'use strict';


const https = require('https')
const querystring = require('querystring');
const axios = require('axios')


exports.handler = async function (event, context, callback) {

    console.log('START createDataExtension...');

    const client = axios.create();
    var jsonIn = JSON.parse(event.body);

    let MODE = jsonIn.mode;
    console.log("MODE", MODE)
    if(!MODE){
        MODE = "CREATE_GDE"; //backwards compatibility with old versions of TM script which do not send a mode to create a GDE
    }
    console.log("MODE", MODE)

    if (MODE && MODE === "IDENTIFY") {

        console.log("IDENTIFY MODE")
        console.log(jsonIn.email);
        console.log(jsonIn.fname);
        console.log(jsonIn.lname);
        console.log(jsonIn.clientKey);

        const res1 = await client.get('https://api.boxever.com/v1.2/browser/create.json?client_key=' + jsonIn.clientKey + '&message=%7B%7D');
        console.log(res1.data);
        console.log(res1.data.ref);
        const newBrowserRef = res1.data.ref;


        let bxApiKey = jsonIn.clientKey;
        let bxApiSecret = process.env[bxApiKey];
        var authStringEncoded = Buffer.from(bxApiKey + ":" + bxApiSecret).toString('base64')
        var auth = "Basic " + authStringEncoded;

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            }
        };

        var postData = {};
        if (isv2DataModel(jsonIn.clientKey)) {
            console.log("its v1 data model")
            postData = {
                "channel": "WEB",
                "type": "IDENTITY",
                "language": "EN",
                "currency": "USD",
                "page": "",
                "pos": jsonIn.pos,
                "email": jsonIn.email,
                "browser_id": newBrowserRef,
                "firstname": jsonIn.fname,
                "lastname": jsonIn.lname,
            }
        } else {
            console.log("its v2 data model")
            postData = {
                "channel": "WEB",
                "type": "IDENTITY",
                "language": "EN",
                "currency": "USD",
                "page": "",
                "pos": jsonIn.pos,
                "email": jsonIn.email,
                "browser_id": newBrowserRef,
                "firstname": jsonIn.fname,
                "lastname": jsonIn.lname,
                "identifiers": [{
                    "provider": "BXEMAIL",
                    "id": jsonIn.email
                }]
            }
        }



        const res2 = await client.get("https://api.boxever.com:443/v1.2/event/create.json?client_key=" + jsonIn.clientKey + "&message=" + JSON.stringify(postData));
        console.log(res2.data);


        let response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify("OK")
        };
        return response;


    } else if (MODE && MODE === "DELETE_GDE") {
        
        console.log('START deleteDataExtension...');

        var jsonIn = JSON.parse(event.body);
        console.log(jsonIn.guestRef);
        console.log(jsonIn.dataExtensionName);
        console.log(jsonIn.dataExtensionRef);


        var baseUrl = getBaseURL(jsonIn.clientKey)
        var deleteURL = baseUrl + "/v2/guests/" + jsonIn.guestRef +
            "/ext" + jsonIn.dataExtensionName + "/" + jsonIn.dataExtensionRef;
        var auth = getAuth(jsonIn.clientKey);


        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            }
        };


        var success = false;
        await axios.delete(deleteURL, axiosConfig)
            .then((res) => {
                console.log("THEN: ", res);
                success = true;
            })
            .catch((err) => {
                console.log("CATCH: ", err);
            })


        let response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({ success: success })
        };
        console.log("response: " + JSON.stringify(response))
        return response;
    } else if (MODE && MODE === "CREATE_GDE") {
        console.log("ELSEA");
        console.log(jsonIn.guestRef);
        console.log(jsonIn.dataExtensionName);
        console.log(jsonIn.dataExtensionKey);
        console.log(jsonIn.data);
        console.log(jsonIn.clientKey);


        var baseUrl = getBaseURL(jsonIn.clientKey);
        var url = baseUrl + '/v2/guests/' + jsonIn.guestRef + '/ext' + jsonIn.dataExtensionName;
        var auth = getAuth(jsonIn.clientKey);

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            }
        };
        var postData = {
            "key": jsonIn.dataExtensionKey
        }

        for (let key in jsonIn.data) {
            postData[key] = jsonIn.data[key];
        }

        var success = false;
        await axios.post(url, postData, axiosConfig)
            .then((res) => {
                console.log("THEN: ", res);
                success = true;
            })
            .catch((err) => {
                console.log("CATCH: ", err);
            })


        let response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({ success: success })
        };
        console.log("response: " + JSON.stringify(response))
        return response;
    }




};

const OLD_V1_DATA_MODEL_CLIENTS = ["pqsGAMEJ9jsRlJMQPTrnpk0cGxD4ab70", "pqsFinGP4nW3iqC4JzgRMGZMgODLuDVM",
    "pqsMedIa6PvIs50quSIOAPHcL0TJTQpk", "pqsSIOPAxhMC9zJLJSZNFURPNqALIFwd", "pqsHoMeZqwc3fXgLCQs1p21ImhAr6tPL"];

const isv2DataModel = function (clientKey) {
    if (OLD_V1_DATA_MODEL_CLIENTS.includes(clientKey)) {
        return true;
    }
    return false;
}

const getBaseURL = function (clientKey) {
    var baseUrl = "https://api.boxever.com:443";
    //ap client key
    if (clientKey === "sise3apsjuzewfkne2rmuuedwflq2ruc" ||
        clientKey === "sise1aprs042qjutf9b9p94lx31bk8n8") {
        baseUrl = "https://api-ap-southeast-2-production.boxever.com"
    }
    //us client key
    if(clientKey === "sise2usl84d0ouwq5w7zd4wvq1wn5xkd"){
        baseUrl = "https://api-us.boxever.com"
    }
    return baseUrl;
}

const getAuth = function (clientKey) {
    let bxApiSecret = process.env[clientKey];
    var authStringEncoded = Buffer.from(clientKey + ":" + bxApiSecret).toString('base64')
    var auth = "Basic " + authStringEncoded;
    return auth;
}