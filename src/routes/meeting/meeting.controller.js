const { v4: uuidv4 } = require("uuid");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const sgMail = require('@sendgrid/mail');
// const AfricasTalking = require('africastalking');

const accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Your Account SID from www.twilio.com/console
const authToken = 'your_auth_token'; // Your Auth Token from www.twilio.com/console

const client = require('twilio')(accountSid, authToken);

require("dotenv").config();





async function httpTwilio(req, res) {
    // create the twilioClient
    const twilioClient = require("twilio")(
        process.env.TWILIO_API_KEY_SID,
        process.env.TWILIO_API_KEY_SECRET, { accountSid: process.env.TWILIO_ACCOUNT_SID }
    );

    const findOrCreateRoom = async(roomName) => {
        try {
            // see if the room exists already. If it doesn't, this will throw
            // error 20404.
            await twilioClient.video.v1.rooms(roomName).fetch();
        } catch (error) {
            // the room was not found, so create it
            if (error.code == 20404) {
                await twilioClient.video.v1.rooms.create({
                    uniqueName: roomName,
                    type: "go",
                });
            } else {
                // let other errors bubble up
                throw error;
            }
        }
    };

    const getAccessToken = (roomName) => {
        // create an access token
        const token = new AccessToken(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_API_KEY_SID,
            process.env.TWILIO_API_KEY_SECRET,
            // generate a random unique identity for this participant
            { identity: uuidv4() }
        );
        // create a video grant for this specific room
        const videoGrant = new VideoGrant({
            room: roomName,
        });

        // add the video grant
        token.addGrant(videoGrant);
        // serialize the token and return it
        return token.toJwt();
    };

    // return 400 if the request has an empty body or no roomName
    if (!req.body || !req.body.roomName) {
        return res.status(400).send("Must include roomName argument.");
    }
    const roomName = req.body.roomName;
    // find or create a room with the given roomName
    findOrCreateRoom(roomName);
    // generate an Access Token for a participant in this room
    const token = getAccessToken(roomName);
    res.send({
        token: token,
    });

}

async function renderMeeting(req, res) {
    let isDoc;
    if (req.user.role === "DOCTOR") {
        isDoc = true;
    } else {
        isDoc = false;
    }
    res.render("meeting.hbs", { isDoc, page: "VIDEO MEETING" })
}

async function sendMail(req, res) {
    console.log(req.body)
    const { to, subject, text } = req.body
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to, // Change to your recipient
        from: 'adolph@acg.co.ke', // Change to your verified sender
        subject,
        text,
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
        .send(msg)
        .then(() => {
            // console.log('Email sent')
            // req.flash("success_msg", "Appointment email sent successfull");
            // res.redirect('/manage');
            res.send("email sent")
        })
        .catch((error) => {
            console.error(error.response.body)
        })
}

async function sendSms(req, res) {
    try {
        client.messages
            .create({
                body: 'Hello from twilio-node',
                to: '+12345678901', // Text this number
                from: '+12345678901', // From a valid Twilio number
            })
            .then((message) => console.log(message.sid));


    } catch (ex) {
        console.error(ex);
    }
}

module.exports = { httpTwilio, renderMeeting, sendMail, sendSms }