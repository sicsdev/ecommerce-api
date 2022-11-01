const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  '284322470200-e1a7iscos4tfe4l8h1b4qngo4d7jkojj.apps.googleusercontent.com',
  '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',
  'http://localhost:8800'
);

exports.getRefreshToken = async function () {
  // Access scopes for read-only Drive activity.
  const scopes = [
    'https://www.googleapis.com/auth/drive.metadata.readonly'
  ];

  // Generate a url that asks permissions for the Drive activity scope
  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
    include_granted_scopes: true
  });
  return authorizationUrl;
}