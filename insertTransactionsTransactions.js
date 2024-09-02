// Import Firebase Admin SDK and Initialize the App
import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' };

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Define the `transactions_transactions` data
const transactionsTransactions = [
  {
    "id": 1,
    "sender_phone": "0701000001",
    "receiver_phone": "0701000002",
    "amount": 500,
    "fee": 2,
    "created_at": new Date("2024-08-18T10:00:00")
  },
  {
    "id": 2,
    "sender_phone": "0701000003",
    "receiver_phone": "0701000004",
    "amount": 800,
    "fee": 2,
    "created_at": new Date("2024-08-18T10:05:00")
  },
  {
    "id": 3,
    "sender_phone": "0701000005",
    "receiver_phone": "0701000006",
    "amount": 900,
    "fee": 2,
    "created_at": new Date("2024-08-18T10:10:00")
  },
  {
    "id": 4,
    "sender_phone": "0722000001",
    "receiver_phone": "0722000002",
    "amount": 1000,
    "fee": 2,
    "created_at": new Date("2024-08-18T11:00:00")
  },
  {
    "id": 5,
    "sender_phone": "0722000003",
    "receiver_phone": "0722000004",
    "amount": 950,
    "fee": 2,
    "created_at": new Date("2024-08-18T11:05:00")
  },
  {
    "id": 6,
    "sender_phone": "0740000001",
    "receiver_phone": "0740000002",
    "amount": 1000,
    "fee": 2,
    "created_at": new Date("2024-08-18T12:00:00")
  },
  {
    "id": 7,
    "sender_phone": "0740000003",
    "receiver_phone": "0740000004",
    "amount": 500,
    "fee": 2,
    "created_at": new Date("2024-08-18T12:05:00")
  },
  {
    "id": 8,
    "sender_phone": "0701000007",
    "receiver_phone": "0701000008",
    "amount": 1500,
    "fee": 5,
    "created_at": new Date("2024-08-18T10:15:00")
  },
  {
    "id": 9,
    "sender_phone": "0701000009",
    "receiver_phone": "0701000010",
    "amount": 2000,
    "fee": 5,
    "created_at": new Date("2024-08-18T10:20:00")
  },
  {
    "id": 10,
    "sender_phone": "0722000005",
    "receiver_phone": "0722000006",
    "amount": 3000,
    "fee": 5,
    "created_at": new Date("2024-08-18T11:10:00")
  },
  {
    "id": 11,
    "sender_phone": "0722000007",
    "receiver_phone": "0722000008",
    "amount": 4000,
    "fee": 5,
    "created_at": new Date("2024-08-18T11:15:00")
  },
  {
    "id": 12,
    "sender_phone": "0740000005",
    "receiver_phone": "0740000006",
    "amount": 5000,
    "fee": 5,
    "created_at": new Date("2024-08-18T12:10:00")
  },
  {
    "id": 13,
    "sender_phone": "0740000007",
    "receiver_phone": "0740000008",
    "amount": 6000,
    "fee": 5,
    "created_at": new Date("2024-08-18T12:15:00")
  },
  {
    "id": 14,
    "sender_phone": "0701000002",
    "receiver_phone": "0740000003",
    "amount": 7000,
    "fee": 5,
    "created_at": new Date("2024-08-18T13:00:00")
  },
  {
    "id": 15,
    "sender_phone": "0722000002",
    "receiver_phone": "0701000003",
    "amount": 8000,
    "fee": 5,
    "created_at": new Date("2024-08-18T13:05:00")
  },
  {
    "id": 16,
    "sender_phone": "0740000001",
    "receiver_phone": "0722000003",
    "amount": 9000,
    "fee": 5,
    "created_at": new Date("2024-08-18T13:10:00")
  },
  {
    "id": 17,
    "sender_phone": "0701000004",
    "receiver_phone": "0740000004",
    "amount": 10000,
    "fee": 5,
    "created_at": new Date("2024-08-18T13:15:00")
  }
];

// Function to insert data into Firestore
async function insertTransactionsTransactions() {
  const collectionRef = db.collection('transactions_transactions');
  
  for (const transaction of transactionsTransactions) {
    const docRef = collectionRef.doc(transaction.id.toString());
    await docRef.set({
      sender_phone: transaction.sender_phone,
      receiver_phone: transaction.receiver_phone,
      amount: transaction.amount,
      fee: transaction.fee,
      created_at: transaction.created_at
    });
    console.log(`Inserted transaction with ID: ${transaction.id}`);
  }

  console.log('All transactions have been inserted successfully.');
}

// Run the function
insertTransactionsTransactions().catch(console.error);
