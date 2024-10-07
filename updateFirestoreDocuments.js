// Import Firebase Admin SDK and Initialize the App
import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' }; // Replace with the path to your Firebase service account key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Function to add `docId` field to documents in a given collection
async function addDocumentIdToCollection(collectionName) {
  const collectionRef = db.collection(collectionName);

  try {
    // Retrieve all documents in the collection
    const snapshot = await collectionRef.get();

    // Batch to perform all updates together
    const batch = db.batch();

    // Iterate through each document in the collection
    snapshot.forEach((doc) => {
      const docRef = collectionRef.doc(doc.id);

      // Add the docId field to each document
      batch.set(docRef, {
        ...doc.data(),  // Keep existing document data
        docId: doc.id   // Add document ID as `docId`
      }, { merge: true });
    });

    // Commit the batch update
    await batch.commit();
    console.log(`Updated all documents in the '${collectionName}' collection with 'docId' field.`);
  } catch (error) {
    console.error(`Error updating documents in the '${collectionName}' collection: `, error);
  }
}

// List of collections to update
const collectionsToUpdate = [
  'common_users',
  'supermarket_admins',
  'supermarket_purchases',
  'supermarket_receipts',
  'supermarket_supermarkets',
  'supermarket_users',
  'supermarketdata_customers',
  'supermarketdata_supermarkets',
  'supermarketdata_transactions',
  'transactions_transactions',
  'transactions_users'
];

// Function to update all collections
async function updateAllCollections() {
  for (const collectionName of collectionsToUpdate) {
    await addDocumentIdToCollection(collectionName);
  }
  console.log('All collections have been updated successfully.');
}

// Run the update function
updateAllCollections().catch(console.error);
