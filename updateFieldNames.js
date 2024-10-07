import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function updateFieldNames() {
  // Collections and field mappings
  const collections = [
    { name: 'common_users', oldField: 'docId', newField: 'user_id' },
    { name: 'supermarket_admins', oldField: 'docId', newField: 'user_id' },
    { name: 'supermarket_receipts', oldField: 'docId', newField: 'receipt_id' },
    { name: 'supermarket_supermarkets', oldFields: { 'docId': 'supermarket_id', 'name': 'supermarket_name' } },
    { name: 'supermarket_users', oldField: 'docId', newField: 'user_id' },
    { name: 'supermarketdata_customers', oldField: 'docId', newField: 'user_id' },
    { name: 'supermarketdata_supermarkets', oldField: 'name', newField: 'supermarket_name' },
    { name: 'supermarketdata_transactions', oldField: 'docId', newField: 'user_id' },
    { name: 'transactions_users', oldField: 'docId', newField: 'user_id' }
  ];

  // Function to rename fields in a collection
  async function renameField(collectionName, oldFields, newFields) {
    const batch = db.batch();
    const snapshot = await db.collection(collectionName).get();

    snapshot.forEach(doc => {
      const data = doc.data();
      const updatedData = {};

      if (typeof oldFields === 'string') {
        // Single field mapping
        if (data.hasOwnProperty(oldFields)) {
          updatedData[newFields] = data[oldFields];
          delete data[oldFields];
        }
      } else {
        // Multiple field mappings
        for (let oldField in oldFields) {
          if (data.hasOwnProperty(oldField)) {
            updatedData[oldFields[oldField]] = data[oldField];
            delete data[oldField];
          }
        }
      }

      if (Object.keys(updatedData).length > 0) {
        batch.update(doc.ref, updatedData);
      }
    });

    await batch.commit();
    console.log(`Updated fields in ${collectionName}`);
  }

  // Iterate through each collection and rename fields
  for (const collection of collections) {
    if (typeof collection.oldFields === 'object') {
      await renameField(collection.name, collection.oldFields);
    } else {
      await renameField(collection.name, collection.oldField, collection.newField);
    }
  }
}

updateFieldNames().catch(console.error);
