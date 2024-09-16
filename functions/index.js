import admin from 'firebase-admin';
import functions from 'firebase-functions';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load serviceAccountKey.json using fs
let serviceAccount;
try {
  serviceAccount = JSON.parse(
    readFileSync(join(__dirname, '../src/firebase/serviceAccountKey.json'), 'utf8')
  );
} catch (error) {
  console.error('Error loading service account key:', error);
  process.exit(1); // Exit if the service account key fails to load
}

// Initialize Firebase Admin SDK
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
  process.exit(1); // Exit if Firebase Admin initialization fails
}

const db = admin.firestore();

// Function to create or update the combined Firestore document
async function updateCombinedDocument() {
  try {
    // Fetch common users and build a lookup
    const commonUsersSnapshot = await db.collection('common_users').get();
    const commonUsers = commonUsersSnapshot.docs.reduce((acc, doc) => {
      acc[doc.id] = {
        email: doc.data().email,
      };
      return acc;
    }, {});

    // Fetch supermarket receipts
    const receiptsSnapshot = await db.collection('supermarket_receipts').get();
    const receipts = receiptsSnapshot.docs.reduce((acc, doc) => {
      const data = doc.data();
      if (commonUsers[data.user_id]) {
        acc[data.user_id] = {
          purchase_date: data.purchase_date,
          supermarket_name: data.supermarket_name,
          total_cost: data.total_cost,
        };
      }
      return acc;
    }, {});

    // Fetch supermarket purchases
    const purchasesSnapshot = await db.collection('supermarket_purchases').get();
    const purchases = purchasesSnapshot.docs.reduce((acc, doc) => {
      const data = doc.data();
      const receipt = receipts[data.receipt_id];
      if (receipt) {
        if (!acc[data.receipt_id]) {
          acc[data.receipt_id] = [];
        }
        acc[data.receipt_id].push({
          item_name: data.item_name,
          quantity: data.quantity,
          total_price: data.total_price,
        });
      }
      return acc;
    }, {});

    // Fetch supermarket data transactions
    const transactionsSnapshot = await db.collection('supermarketdata_transactions').get();
    const transactions = transactionsSnapshot.docs.reduce((acc, doc) => {
      const data = doc.data();
      if (commonUsers[data.customer_id]) {
        acc[data.customer_id] = {
          mode_of_payment: data.mode_of_payment,
        };
      }
      return acc;
    }, {});

    // Fetch supermarket data supermarkets
    const supermarketsSnapshot = await db.collection('supermarketdata_supermarkets').get();
    const supermarkets = supermarketsSnapshot.docs.reduce((acc, doc) => {
      const data = doc.data();
      acc[data.name] = {
        operator_name: data.operator_name,
      };
      return acc;
    }, {});

    // Combine data for each user
    for (const userId in commonUsers) {
      const userData = commonUsers[userId];
      const userReceipts = Object.values(receipts).filter(r => r.user_id === userId);
      const userTransactions = transactions[userId] || {};

      const combinedData = {
        user_id: userId,
        email: userData.email,
        receipts: userReceipts.map(receipt => ({
          ...receipt,
          purchases: purchases[receipt.receipt_id] || [],
          operator_name: supermarkets[receipt.supermarket_name]?.operator_name || 'Unknown',
        })),
        transactions: userTransactions,
      };

      // Save the combined data to a Firestore document
      const combinedDocRef = db.collection('combined_data').doc(userId);
      await combinedDocRef.set(combinedData, { merge: true });

      console.log(`Combined document for user ${userId} updated successfully.`);
    }
  } catch (error) {
    console.error('Error updating combined document:', error);
  }
}

// Firestore triggers for updating the combined document
export const onSupermarketReceiptsChange = functions.firestore
  .document('supermarket_receipts/{docId}')
  .onWrite(async (change, context) => {
    console.log(`Document ${context.params.docId} changed in supermarket_receipts`);
    await updateCombinedDocument();
  });

export const onSupermarketDataTransactionsChange = functions.firestore
  .document('supermarketdata_transactions/{docId}')
  .onWrite(async (change, context) => {
    console.log(`Document ${context.params.docId} changed in supermarketdata_transactions`);
    await updateCombinedDocument();
  });

// Initial function call to create the combined document
updateCombinedDocument();
