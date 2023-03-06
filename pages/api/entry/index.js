import db from "../../../utils/db";

function validateMobileNumber(number) {
  const re = /^[0-9]{10}$/;
  return re.test(number);
}

async function getEntryIfNumberRegistered(number) {
  const collectionRef = db.collection("entries");
  const querySnapshot = await collectionRef
    .where("mobileNo", "==", number)
    .get();
  if (querySnapshot.empty) {
    return false;
  } else {
    return querySnapshot.docs[0].data();
  }
}

export default async (req, res) => {
  try {
    // const { mobile } = req.body;
    // const entries = await db.collection('entries').get();
    // const entriesData = entries.docs.map(entry => entry.data());

    // if (entriesData.some(entry => entry.mobile === mobile)) {
    //   res.status(400).end();
    // }
    // else {
    let member = await getEntryIfNumberRegistered(req.body.mobileNo);
    if (!validateMobileNumber(req.body.mobileNo)) {
      res.status(400).json({ error: "Mobile number is not valid" });
      return;
    }
    if (member) {
      res.status(400).json({ error: "Mobile number is already registered" });
      return;
    }

    // Try couple times to enter the info with the generated id in case of 
    // competing attempts to enter data into entries.
    const maxAttempts = 5;
    let attempts = maxAttempts;
    while (--attempts >= 0) {
      let newMemberId = db.collection("computed").doc("stats").get().newID;
      
      try {
        const { id } = await db.collection("entries").add({
          ...req.body,
          created: new Date().toISOString(),
          memberId: newMemberId
        });
        // Successfully added new members to entries.
        res.status(200).json({ id });
        return;
      }
      // memberId already exists. Try again if possible.
      catch (e) {
        console.error(e, "Failed to save member id. Trying again.");
        // TODO: Verify that we throw an exception if member id already exists.
        continue;
      }
    }

    res.status(400).json({ error: "Catastrophic error: Failed to save member id even after " + maxAttempts + " attempts." });
    return;
    
  } catch (e) {
    console.log("db not connected",e);
    res.status(400).json({ error: "something went wrong :" + e.message });
  }
};
