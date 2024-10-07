// Import Firebase Admin SDK and Initialize the App
import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' };

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Function to update specific fields to string type in a collection
async function updateFieldToString(collectionName, fieldsToConvert) {
  const collectionRef = db.collection(collectionName);

  try {
    // Retrieve all documents in the collection
    const snapshot = await collectionRef.get();

    // Batch to perform all updates together
    const batch = db.batch();

    // Iterate through each document in the collection
    snapshot.forEach((doc) => {
      const docRef = collectionRef.doc(doc.id);
      const updatedData = { ...doc.data() };

      // Convert specified fields to strings
      fieldsToConvert.forEach((field) => {
        if (updatedData[field] !== undefined) {
          updatedData[field] = updatedData[field].toString(); // Convert to string
        }
      });

      // Add the document update to the batch
      batch.set(docRef, updatedData, { merge: true });
    });

    // Commit the batch update
    await batch.commit();
    console.log(`Updated documents in '${collectionName}' collection with specified fields converted to string.`);
  } catch (error) {
    console.error(`Error updating documents in '${collectionName}' collection: `, error);
  }
}

// List of collections and fields to update
const collectionsToUpdate = [
  {
    name: 'supermarket_purchases',
    fields: ['receipt_id'],
  },
  {
    name: 'supermarket_receipts',
    fields: ['user_id'],
  },
  {
    name: 'supermarket_users',
    fields: ['supermarket_id'],
  },
  {
    name: 'supermarketdata_transactions',
    fields: ['customer_id', 'supermarket_id'],
  },
];

// Function to update all collections with specified field conversions
async function updateAllCollections() {
  for (const collection of collectionsToUpdate) {
    await updateFieldToString(collection.name, collection.fields);
  }
  console.log('All specified collections have been updated successfully.');
}

// Run the update function
updateAllCollections().catch(console.error);
