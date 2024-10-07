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
  process.exit(1);
}

// Initialize Firebase Admin SDK
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
  process.exit(1);
}

const db = admin.firestore();

async function fetchCombinedUserData(userId) {
  try {
    const supermarketPurchasesSnapshot = await db.collection('supermarket_purchases')
      .where('user_id', '==', userId)
      .get();

    console.log(`Fetched ${supermarketPurchasesSnapshot.size} purchases for user ${userId}.`);

    const combinedPurchases = [];

    supermarketPurchasesSnapshot.forEach(doc => {
      const data = doc.data();
      const combinedPurchase = {
        created_at: data.created_at,
        docId: doc.id,
        item_name: data.item_name,
        price_per_unit: data.price_per_unit,
        quantity: data.quantity,
        receipt_id: data.receipt_id,
        total_price: data.total_price,
      };
      combinedPurchases.push(combinedPurchase);
    });

    if (combinedPurchases.length > 0) {
      const combinedPurchasesRef = db.collection('combined_purchases').doc(`${userId}`);
      await combinedPurchasesRef.set({ user_id: userId, purchases: combinedPurchases });
      console.log(`Combined purchases for user ${userId} created successfully.`);
    } else {
      console.log(`No purchases found for user ${userId}.`);
    }

  } catch (error) {
    console.error('Error fetching combined user data:', error);
  }
}

// Firestore triggers for updating the combined purchases
export const onSupermarketPurchasesChange = functions.firestore
  .document('supermarket_purchases/{docId}')
  .onWrite(async (change, context) => {
    const userId = change.after.exists ? change.after.data().user_id : change.before.data().user_id;
    console.log(`Triggered for userId: ${userId}`);
    await fetchCombinedUserData(userId);
  });

// Initial function call to fetch combined user data for a specific user
fetchCombinedUserData(10); // Example user ID
