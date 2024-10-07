// functions/index.js

import cors from 'cors';
import admin from 'firebase-admin';
import functions from 'firebase-functions';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load Firebase service account credentials
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
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
    process.exit(1);
  }
}

const db = admin.firestore();
const corsMiddleware = cors({ origin: true });

// Cloud Function to process payment between sender and receiver
export const processPayment = functions.https.onRequest(async (req, res) => {
  // Apply CORS
  corsMiddleware(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { senderNumber, receiverNumber, amount } = req.body;

    // Input validation
    if (!senderNumber || !receiverNumber || !amount) {
      return res.status(400).json({ error: 'Sender, receiver, and amount are required fields.' });
    }

    // Validate amount
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount < 100 || numericAmount > 10000) {
      return res.status(400).json({ error: 'Amount must be between 100 and 10,000.' });
    }

    try {
      // Start Firestore transaction
      await db.runTransaction(async (transaction) => {
        const senderRef = db.collection('transactions_users').doc(senderNumber);
        const receiverRef = db.collection('transactions_users').doc(receiverNumber);

        // Fetch sender and receiver documents
        const senderDoc = await transaction.get(senderRef);
        const receiverDoc = await transaction.get(receiverRef);

        if (!senderDoc.exists) throw new Error('Sender does not exist.');
        if (!receiverDoc.exists) throw new Error('Receiver does not exist.');

        const senderData = senderDoc.data();
        const receiverData = receiverDoc.data();

        // Check sender balance
        if (senderData.balance < numericAmount) {
          throw new Error('Insufficient balance.');
        }

        // Update balances
        const newSenderBalance = senderData.balance - numericAmount;
        const newReceiverBalance = receiverData.balance + numericAmount;

        transaction.update(senderRef, { balance: newSenderBalance });
        transaction.update(receiverRef, { balance: newReceiverBalance });

        // Create transaction record
        const fee = numericAmount < 1000 ? 2 : 5;
        const transactionData = {
          amount: numericAmount,
          created_at: new Date(),
          fee,
          receiver_phone: Number(receiverNumber),
          sender_phone: Number(senderNumber),
        };

        const transactionRef = db.collection('transactions_transactions').doc();
        transaction.set(transactionRef, transactionData);
      });

      return res.status(200).json({ message: 'Transaction successful!' });
    } catch (error) {
      console.error('Error during transaction:', error);
      return res.status(500).json({ error: 'Transaction failed.' });
    }
  });
});
