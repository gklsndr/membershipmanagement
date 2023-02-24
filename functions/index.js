const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});



admin.initializeApp();

// Define the Cloud Function
exports.incrementCounter = functions.firestore.document('entries/{entryId}')
    .onCreate((snap, context) => {
        const counterRef = admin.firestore().collection('computed').doc('stats');

        // Increment the counter by 1
        return counterRef.update({ newID : admin.firestore.FieldValue.increment(1) });
    });