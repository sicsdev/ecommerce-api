const { google } = require("googleapis");
const request = require("request");
const axios = require("axios");

exports.googleReports = async function (code) {
  // return new Promise(async (resolve, reject) => {
  const oauth2Client = new google.auth.OAuth2(
    '944509388883-41eajpiirg10gjv5rkcp2na4012c6lcc.apps.googleusercontent.com',
    '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',
    "http://localhost:8800/api/v1/user/google/reports"
  );

  const { tokens } = await oauth2Client.getToken(code);
  console.log("token : ", tokens.access_token);

  const result = await axios({
    method: "POST",
    headers: {
      authorization: "Bearer " + tokens.access_token,
      "developer-token": 'r-MdoNPSCMjChfHSkFlPkg',
      "login-customer-id": '6242285662',
      "Content-Type": "application/json"
    },
    data: {
      "query": "SELECT campaign.name, campaign_budget.amount_micros, campaign.status,campaign.optimization_score, campaign.advertising_channel_type, metrics.clicks, metrics.impressions,metrics.ctr, metrics.average_cpc,metrics.cost_micros, campaign.bidding_strategy_type FROM campaign WHERE segments.date DURING LAST_7_DAYS AND campaign.status!= 'REMOVED'"
    },
    "Content-Type": "application/json",
    url: `https://googleads.googleapis.com/v11/customers/6242285662/googleAds:searchStream`
  })


  console.log("Result :: ", result);

  // })
}

exports.googleAuth = async function (req, res, next) {
  return new Promise((res, rej) => {
    const oauth2Client = new google.auth.OAuth2(
      '944509388883-41eajpiirg10gjv5rkcp2na4012c6lcc.apps.googleusercontent.com',
      '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',
      "http://localhost:8800/api/v1/user/google/reports"
    )
    const scopes = ["https://www.googleapis.com/auth/adwords profile email openid"];

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes
    });

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