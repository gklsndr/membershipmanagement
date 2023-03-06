const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure

admin.initializeApp();

// Define the Cloud Function trigger for generating auto id
exports.autoGenIdUpdate = functions.firestore
  .document("entries/{entryId}")
  .onCreate((snap, context) => {
    const counterRef = admin.firestore().collection("computed").doc("stats");

    // Increment the counter by 1
    return counterRef.update({
      newID: admin.firestore.FieldValue.increment(1),
    });
  });

// Define the Cloud Function for alerting the user on successful payment
exports.sendRegistrationSMS = functions.firestore
  .document("entries/{entryId}")
  .onCreate((snap, context) => {
    const twilioAccountSid = "AC28eb63b977d478be6164e51adfd3a6f3"; // Testing Account for Twilio
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioClient = require("twilio")(twilioAccountSid, twilioAuthToken);
    const entry = snap.data();

    return twilioClient.messages
      .create({
        body: "Hi " + entry.name + ", your application for ARDU membership is successful. Your membership ID is " + entry.memberId + ". Please keep this ID for future reference.",
        from: "+12762658518",
        to: "+91" + entry.mobileNo,
      })
      .then((message) => console.log(message.sid));
  });
