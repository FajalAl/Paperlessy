import admin from 'firebase-admin';
import functions from 'firebase-functions';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load serviceAccountKey.json using fs
const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '../src/firebase/serviceAccountKey.json'), 'utf8')
);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Function to create the combined Firestore document
async function createCombinedDocument() {
  try {
    const commonUsersSnapshot = await db.collection('common_users').get();
    const commonUsers = commonUsersSnapshot.docs.map(doc => ({
      docId: doc.id,
      email: doc.data().email,
    }));

    const supermarketPurchasesSnapshot = await db.collection('supermarket_purchases').get();
    const supermarketPurchases = supermarketPurchasesSnapshot.docs.map(doc => ({
      item_name: doc.data().item_name,
      quantity: doc.data().quantity,
      receipt_id: doc.data().receipt_id,
      total_price: doc.data().total_price,
    }));

    const supermarketReceiptsSnapshot = await db.collection('supermarket_receipts').get();
    const supermarketReceipts = supermarketReceiptsSnapshot.docs.map(doc => ({
      purchase_date: doc.data().purchase_date,
      supermarket_name: doc.data().supermarket_name,
      total_cost: doc.data().total_cost,
      user_id: doc.data().user_id,
    }));

    const supermarketdataTransactionsSnapshot = await db.collection('supermarketdata_transactions').get();
    const supermarketdataTransactions = supermarketdataTransactionsSnapshot.docs.map(doc => ({
      customer_id: doc.data().customer_id,
      mode_of_payment: doc.data().mode_of_payment,
    }));

    const supermarketdataSupermarketsSnapshot = await db.collection('supermarketdata_supermarkets').get();
    const supermarketdataSupermarkets = supermarketdataSupermarketsSnapshot.docs.map(doc => ({
      name: doc.data().name,
      operator_name: doc.data().operator_name,
    }));

    // Combine data from all collections
    const combinedData = {
      common_users: commonUsers,
      supermarket_purchases: supermarketPurchases,
      supermarket_receipts: supermarketReceipts,
      supermarketdata_transactions: supermarketdataTransactions,
      supermarketdata_supermarkets: supermarketdataSupermarkets,
    };

    // Save the combined data to a Firestore document
    const combinedDocRef = db.collection('combined_data').doc('initial_combined_doc');
    await combinedDocRef.set(combinedData, { merge: true });

    console.log('Initial combined document created successfully.');
  } catch (error) {
    console.error('Error creating the combined document:', error);
  }
}

// Firestore triggers for updating the combined document
export const onSupermarketReceiptsChange = functions.firestore
  .document('supermarket_receipts/{docId}')
  .onWrite(async (change, context) => {
    const docId = context.params.docId;

    if (!change.before.exists) {
      // New document created
      console.log(`New supermarket_receipt document created: ${docId}`);
    } else if (change.after.exists) {
      // Document updated
      console.log(`supermarket_receipt document updated: ${docId}`);
    } else {
      // Document deleted
      console.log(`supermarket_receipt document deleted: ${docId}`);
    }

    // Call the function to update the combined document
    await updateCombinedDocument();
  });

export const onSupermarketDataTransactionsChange = functions.firestore
  .document('supermarketdata_transactions/{docId}')
  .onWrite(async (change, context) => {
    const docId = context.params.docId;

    if (!change.before.exists) {
      // New document created
      console.log(`New supermarketdata_transaction document created: ${docId}`);
    } else if (change.after.exists) {
      // Document updated
      console.log(`supermarketdata_transaction document updated: ${docId}`);
    } else {
      // Document deleted
      console.log(`supermarketdata_transaction document deleted: ${docId}`);
    }

    // Call the function to update the combined document
    await updateCombinedDocument();
  });

// Initial function call to create the combined document
createCombinedDocument();
