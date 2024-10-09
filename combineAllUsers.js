import { collection, doc, getDocs, getFirestore, runTransaction } from "firebase/firestore"; // Import Firestore functions

const combineAllUsers = async () => {
  const firestore = getFirestore(); // Initialize Firestore client

  try {
    // Get all documents from 'common_users' collection
    const commonUsersSnapshot = await getDocs(collection(firestore, "common_users"));

    // Iterate over all users in common_users
    for (const commonUserDoc of commonUsersSnapshot.docs) {
      const commonUserData = commonUserDoc.data();
      const userId = commonUserData.user_id; // Get the user_id from common_users

      await runTransaction(firestore, async (transaction) => {
        // Get the document from 'transactions_users' based on user_id
        const transactionsUsersRef = doc(firestore, "transactions_users", userId);
        const transactionsUserDoc = await transaction.get(transactionsUsersRef);

        if (!transactionsUserDoc.exists()) {
          console.warn(`No corresponding transaction data found for user_id: ${userId}`);
          return; // Skip if no matching user in transactions_users
        }

        const transactionsUserData = transactionsUserDoc.data();

        // Combine data from both collections
        const combinedData = {
          ...transactionsUserData,
          email: commonUserData.email,
          name: commonUserData.name,
          role: commonUserData.role,
        };

        // Save the combined data to a new collection 'merged_user_data'
        await transaction.set(doc(firestore, "merged_user_data", userId), combinedData);

        console.log(`User data combined successfully for user_id: ${userId}`);
      });
    }

    console.log("All user data combined successfully");
  } catch (error) {
    console.error("Error combining user data:", error);
  }
};

export default combineAllUsers;
