// purchase_data_admin.js

// Import Firebase Admin SDK and Initialize the App
import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' }; // Adjust the path to your serviceAccountKey.json

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Function to combine purchases by receipt_id and save to Firestore
async function combinePurchasesAndSave() {
  try {
    // Fetch all documents from the supermarket_purchases collection
    const purchasesSnapshot = await db.collection("supermarket_purchases").get();

    // Create a map to group purchases by receipt_id
    const receiptMap = {};

    purchasesSnapshot.forEach((doc) => {
      const data = doc.data();
      const { receipt_id, item_name, price_per_unit, quantity, total_price, created_at } = data;

      // If the receipt_id doesn't exist in the map, create a new entry
      if (!receiptMap[receipt_id]) {
        receiptMap[receipt_id] = {
          receipt_id,
          created_at, // Assume the created_at is the same for all items in the receipt
          items: [],
          total_quantity: 0,
          total_price: 0,
        };
      }

      // Add the current item to the list of items for this receipt
      receiptMap[receipt_id].items.push({
        item_name,
        price_per_unit,
        quantity,
        total_price,
      });

      // Update the total quantity and total price for this receipt
      receiptMap[receipt_id].total_quantity += quantity;
      receiptMap[receipt_id].total_price += total_price;
    });

    // Save the combined receipts to Firestore under a new collection
    const batch = db.batch(); // Batch write for efficiency
    Object.keys(receiptMap).forEach((receiptId) => {
      const newDocRef = db.collection("combined_purchases").doc(receiptId);
      batch.set(newDocRef, receiptMap[receiptId]);
    });

    // Commit the batch write to Firestore
    await batch.commit();
    console.log("Combined purchases saved successfully!");

  } catch (error) {
    console.error("Error combining purchases and saving to Firestore: ", error);
  }
}

// Call the function to combine and save purchases
combinePurchasesAndSave();
