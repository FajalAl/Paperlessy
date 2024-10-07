// Import Firebase Admin SDK and Initialize the App
import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' }; // Adjust the path to your serviceAccountKey.json

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Function to combine supermarket data, transactions, and users
async function combineSupermarketData() {
  try {
    // Fetch all documents from supermarketdata_transactions collection
    const transactionsSnapshot = await db.collection("supermarketdata_transactions").get();

    // Iterate through each document in supermarketdata_transactions
    const batch = db.batch(); // Batch write for efficiency

    for (const transactionDoc of transactionsSnapshot.docs) {
      const transactionData = transactionDoc.data();
      const { supermarket_id2, user_id } = transactionData;

      // Fetch the corresponding supermarket document by supermarket_id2
      const supermarketSnapshot = await db.collection("supermarketdata_supermarkets")
                                          .where("supermarket_id2", "==", supermarket_id2)
                                          .get();

      // Fetch the corresponding user document by user_id
      const userSnapshot = await db.collection("common_users")
                                   .where("user_id", "==", user_id)
                                   .get();

      if (!supermarketSnapshot.empty && !userSnapshot.empty) {
        const supermarketData = supermarketSnapshot.docs[0].data();
        const userData = userSnapshot.docs[0].data();

        // Combine the data from supermarketdata_transactions, supermarketdata_supermarkets, and common_users
        const combinedData = {
          ...transactionData,   // Transaction data
          ...supermarketData,   // Supermarket data
          ...userData           // User data
        };

        // Save the combined data to a new collection (combined_supermarket_transactions)
        const newDocRef = db.collection("combined_supermarket_transactions").doc(transactionData.docId);
        batch.set(newDocRef, combinedData);
      }
    }

    // Commit the batch write to Firestore
    await batch.commit();
    console.log("Combined supermarket data, transactions, and users saved successfully!");

  } catch (error) {
    console.error("Error combining supermarket data, transactions, and users: ", error);
  }
}

// Call the function to combine and save the data
combineSupermarketData();
