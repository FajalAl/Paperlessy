// Import Firebase Admin SDK and Initialize the App
import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' }; // Adjust the path to your serviceAccountKey.json

// Initialize Firebase Admin SDK with Firestore settings
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Enable ignoreUndefinedProperties
db.settings({
  ignoreUndefinedProperties: true,
});

// Function to merge all users into merged_user_data collection
async function mergeAllUsers() {
  try {
    const commonUsersSnapshot = await db.collection('common_users').get();

    // Loop through all users in common_users
    for (const commonUserDoc of commonUsersSnapshot.docs) {
      const commonUserData = commonUserDoc.data();
      const userId = commonUserData.user_id;

      // Find corresponding document in transactions_users based on user_id
      const transactionsUserDoc = await db.collection('transactions_users').doc(userId).get();

      if (transactionsUserDoc.exists) {
        const transactionsUserData = transactionsUserDoc.data();

        // Combine the data from both collections
        const combinedData = {
          ...transactionsUserData,
          email: commonUserData.email,
          name: commonUserData.name,
          role: commonUserData.role,
        };

        // Write the combined data to the 'merged_user_data' collection
        await db.collection('merged_user_data').doc(userId).set(combinedData);
        console.log(`Merged data for user: ${userId}`);
      } else {
        console.warn(`No corresponding transaction data found for user_id: ${userId}`);
      }
    }
    console.log("Data merging process completed.");
  } catch (error) {
    console.error("Error merging user data:", error);
  }
}

// Call the mergeAllUsers function
mergeAllUsers();
