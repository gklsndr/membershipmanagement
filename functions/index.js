const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const twilioAccountSid = "AC28eb63b977d478be6164e51adfd3a6f3";
const twilioAuthToken = "ea4d5b6a272c426f6c5c9da11493bcd3";
const twilioClient = require("twilio")(twilioAccountSid, twilioAuthToken);

admin.initializeApp();

// Define the Cloud Function trigger for generating auto id
exports.autoGenIdUpdate = functions.firestore.document('entries/{entryId}')
    .onCreate((snap, context) => {
        const counterRef = admin.firestore().collection('computed').doc('stats');

        // Increment the counter by 1
        return counterRef.update({ newID : admin.firestore.FieldValue.increment(1) });
    });


// Define the Cloud Function for alerting the user on successfull payment
exports.sendRegistrationSMS = functions.firestore.document('entries/{entryId}')
    .onCreate((snap, context) => {
        const entry = snap.data();

    return twilioClient.messages
    .create({ body: "Hello from Twilio :" + entry.name, from: "+12762658518", to: "+919972755334" })
    .then(message => console.log(message.sid));

     
    });

