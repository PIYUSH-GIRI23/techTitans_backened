const twilio = require('twilio');
const msg = (no, body) => {
    const accountSid = process.env.msg_uri;
    const authToken = process.env.msg_auth;
    const client = require('twilio')(accountSid, authToken);
    client.messages
        .create({
            body: `${body}`,
            from: '+12568249138',
            to: `${no}`
        })
        .then(message => {
            console.log('Message SID:', message.sid);
            return "ok";
        })
        .catch(error => {
            console.error('Error sending message:', error);
            return error;
        });
}

module.exports = msg;
