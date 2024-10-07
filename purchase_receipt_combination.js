// purchase_receipt_combination.js

// Import Firebase Admin SDK and Initialize the App
import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' }; // Adjust the path to your serviceAccountKey.json

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Function to combine data from combined_purchases and supermarket_receipts and save to Firestore
async function combinePurchasesAndReceipts() {
  try {
    // Fetch all documents from combined_purchases collection
    const combinedPurchasesSnapshot = await db.collection("combined_purchases").get();

    // Iterate through each document in combined_purchases
    const batch = db.batch(); // Batch write for efficiency

    for (const purchaseDoc of combinedPurchasesSnapshot.docs) {
      const purchaseData = purchaseDoc.data();
      const { receipt_id } = purchaseData;

      // Fetch the corresponding supermarket_receipt document by receipt_id
      const receiptSnapshot = await db.collection("supermarket_receipts")
                                      .where("receipt_id", "==", receipt_id)
                                      .get();

      if (!receiptSnapshot.empty) {
        const receiptData = receiptSnapshot.docs[0].data(); // Assuming only one receipt per receipt_id

        // Combine the data from combined_purchases and supermarket_receipts
        const combinedData = {
          ...purchaseData, // Purchase data (items, total_quantity, total_price, etc.)
          ...receiptData,  // Receipt data (admin_id, purchase_date, supermarket_name, user_id, etc.)
        };

        // Save the combined data to a new collection (combined_receipts)
        const newDocRef = db.collection("combined_receipts").doc(receiptData.receipt_id);
        batch.set(newDocRef, combinedData);
      }
    }

    // Commit the batch write to Firestore
    await batch.commit();
    console.log("Combined purchases and receipts saved successfully!");

  } catch (error) {
    console.error("Error combining purchases and receipts: ", error);
  }
}

// Call the function to combine and save purchases and receipts
combinePurchasesAndReceipts();
