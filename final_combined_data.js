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

// Function to merge data into final_combined_data
async function mergeData() {
  try {
    // Fetch all documents from combined_supermarket_transactions collection
    const transactionsSnapshot = await db.collection("combined_supermarket_transactions").get();

    // Fetch all documents from combined_receipts collection
    const receiptsSnapshot = await db.collection("combined_receipts").get();

    // Fetch all documents from common_users collection
    const usersSnapshot = await db.collection("common_users").get();

    // Prepare a map for user data
    const usersMap = {};
    usersSnapshot.forEach(userDoc => {
      const userData = userDoc.data();
      usersMap[userData.user_id] = userData; // Create a map using user_id
    });

    // Initialize a batch for efficient writes
    const batch = db.batch();

    // Iterate through each transaction document
    for (const transactionDoc of transactionsSnapshot.docs) {
      const transactionData = transactionDoc.data();
      const { customer_id, mode_of_payment, supermarket_id2, total_cost, user_id } = transactionData;

      // Find the corresponding receipt document by user_id
      const matchingReceipts = receiptsSnapshot.docs.filter(receiptDoc => {
        return receiptDoc.data().user_id === user_id; // Check for matching user_id
      });

      if (matchingReceipts.length > 0) {
        const receiptData = matchingReceipts[0].data(); // Take the first matching receipt

        // Prepare the items array
        const itemsArray = [
          {
            item_name: "Apples",
            price_per_unit: 5,
            quantity: 10,
            total_price: 50
          },
          {
            item_name: "Bananas",
            price_per_unit: 3,
            quantity: 15,
            total_price: 45
          },
          {
            item_name: "Oranges",
            price_per_unit: 5.25,
            quantity: 11,
            total_price: 55.75
          }
        ];

        // Calculate total_quantity and total_price from items
        const total_quantity = itemsArray.reduce((sum, item) => sum + item.quantity, 0);
        const total_price = itemsArray.reduce((sum, item) => sum + item.total_price, 0);

        // Combine all data into a final document
        const finalCombinedData = {
          created_at: new Date().toISOString(), // Use current timestamp or fetch from the document if needed
          customer_id,
          docId: user_id, // Assuming you want to use user_id as docId
          email: usersMap[user_id]?.email || null, // Get email from usersMap
          mode_of_payment,
          name: usersMap[user_id]?.name || null, // Get name from usersMap
          operator_name: receiptData.operator_name, // Directly set without default value
          role: usersMap[user_id]?.role || null, // Get role from usersMap
          supermarket_id2,
          supermarket_name: receiptData.supermarket_name, // Directly set without default value
          total_cost,
          user_id,
          admin_id: null, // As specified
          items: itemsArray, // Array of items
          purchase_date: receiptData.purchase_date, // Directly set without default value
          receipt_data: receiptData.receipt_data, // Directly set without default value
          receipt_id: receiptData.receipt_id, // Directly set without default value
          total_price, // Same as total_cost
          total_quantity // Total quantity from items
        };

        // Save the combined data to the final_combined_data collection
        const newDocRef = db.collection("final_combined_data").doc(transactionData.docId);
        batch.set(newDocRef, finalCombinedData);
      }
    }

    // Commit the batch write to Firestore
    await batch.commit();
    console.log("Combined data saved successfully to final_combined_data!");

  } catch (error) {
    console.error("Error merging data: ", error);
  }
}

// Call the function to merge and save the data
mergeData();
