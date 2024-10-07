// Step 3.1: Import Firebase Admin SDK and Initialize the App
import admin from 'firebase-admin';

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

// Get a Firestore instance
const db = admin.firestore();

const updateTransactionRecords = async () => {
  try {
    // Update the transactions_transactions collection
    const transactionsSnapshot = await db.collection('transactions_transactions').get();
    const batch = db.batch();

    transactionsSnapshot.forEach((doc) => {
      const data = doc.data();
      const updatedData = {
        ...data,
        receiver_phone: Number(data.receiver_phone), // Convert string to number
        sender_phone: Number(data.sender_phone), // Convert string to number
      };

      // Set the updated data back to the document
      batch.set(doc.ref, updatedData);
    });

    await batch.commit();
    console.log('Updated transactions_transactions successfully!');
  } catch (error) {
    console.error('Error updating transactions_transactions:', error);
  }

  try {
    // Update the transactions_users collection
    const usersSnapshot = await db.collection('transactions_users').get();
    const userBatch = db.batch();

    usersSnapshot.forEach((doc) => {
      const data = doc.data();
      const updatedData = {
        ...data,
        phone_number: Number(data.phone_number), // Convert string to number
      };

      // Set the updated data back to the document
      userBatch.set(doc.ref, updatedData);
    });

    await userBatch.commit();
    console.log('Updated transactions_users successfully!');
  } catch (error) {
    console.error('Error updating transactions_users:', error);
  }
};

// Run the update function
updateTransactionRecords();
