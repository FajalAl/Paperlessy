import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function deleteFieldFromDocuments(collectionName, fieldToDelete) {
  const batch = db.batch();
  const snapshot = await db.collection(collectionName).get();

  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.hasOwnProperty(fieldToDelete)) {
      batch.update(doc.ref, {
        [fieldToDelete]: admin.firestore.FieldValue.delete() // Delete the field
      });
    }
  });

  await batch.commit();
  console.log(`Deleted ${fieldToDelete} field from all documents in ${collectionName}`);
}

// Call the function to delete 'id' from 'common_users' and 'supermarket_admins'
async function deleteIdFields() {
  await deleteFieldFromDocuments('common_users', 'id');
  await deleteFieldFromDocuments('supermarket_admins', 'id');
}

deleteIdFields()
  .catch(console.error);
