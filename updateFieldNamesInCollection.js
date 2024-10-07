import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function updateFieldNamesInCollection(collectionName, fieldMappings) {
  const batch = db.batch();
  const snapshot = await db.collection(collectionName).get();

  snapshot.forEach(doc => {
    const data = doc.data();
    const updatedData = {};

    // Iterate through field mappings
    for (const [oldField, newField] of Object.entries(fieldMappings)) {
      if (data.hasOwnProperty(oldField)) {
        updatedData[newField] = data[oldField]; // Assign new field name
        delete data[oldField]; // Remove the old field
      }
    }

    // If there are updates to make, batch the update
    if (Object.keys(updatedData).length > 0) {
      batch.update(doc.ref, updatedData);
    }
  });

  await batch.commit();
  console.log(`Updated fields in ${collectionName}`);
}

// Field mappings for supermarketdata_transactions
const transactionFieldMappings = {
  customer_id: 'user_id',
  supermarket_id: 'supermarket_id2'
};

// Field mapping for supermarketdata_supermarkets
const supermarketFieldMappings = {
  docId: 'supermarket_id2'
};

// Update supermarketdata_transactions
updateFieldNamesInCollection('supermarketdata_transactions', transactionFieldMappings)
  .then(() => {
    // After updating transactions, update supermarketdata_supermarkets
    return updateFieldNamesInCollection('supermarketdata_supermarkets', supermarketFieldMappings);
  })
  .catch(console.error);
