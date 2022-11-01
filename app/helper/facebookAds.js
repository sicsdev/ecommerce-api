const request = require("request");
const axios = require("axios");
const fetch = require('node-fetch');

exports.getFacebookReports = async function (code) {
    const { data } = await axios({
        method: "GET",
        params: {
            client_id: '416016027168259',
            client_secret: 'f5778e463d0d02311e47e14c5319ee4c',
            redirect_uri: 'http://localhost:3000/settings',
            code: code.toString(),
        },
        "Content-Type": "application/json",
        url: `https://graph.facebook.com/v15.0/oauth/access_token`
    })

    if (data.access_token) {
        let url = `https://graph.facebook.com/v15.0/me?fields=id,name,accounts{ad_campaign},adaccounts{campaigns{account_id,name,id,objective},activities}&access_token=${data.access_token}`;
        const response = await fetch(url);
        return await response.json();
    }
    
}

exports.facebookAuth = async function (req, res, next) {
    let redirect_uri = "http://localhost:3000/settings";
    return new Promise((res, rej) => {
        const url = `https://www.facebook.com/v15.0/dialog/oauth?response_type=code&display=popup&client_id=416016027168259&client_secret=f5778e463d0d02311e47e14c5319ee4c&redirect_uri=${redirect_uri}`;
        request(url, async (err, response, body) => {
            if (!err) {
                res(url);
            }
            else {
                rej(err);
            }
        })
    })
} 