// Import Firebase Admin SDK and Initialize the App
import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' };

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Define the `supermarketdata_transactions` data
const supermarketdataTransactions = [
  {
    id: 1,
    customer_id: 6,
    supermarket_id: 1,
    mode_of_payment: "Credit Card",
    total_cost: 150.75,
    created_at: new Date("2024-08-20T10:28:31.333895"),
  },
  {
    id: 2,
    customer_id: 7,
    supermarket_id: 2,
    mode_of_payment: "Debit Card",  // Updated
    total_cost: 85.50,              // Updated
    created_at: new Date("2024-08-20T10:28:31.333895"),
  },
  {
    id: 3,
    customer_id: 8,
    supermarket_id: 3,
    mode_of_payment: "Mobile Payment",  // Updated
    total_cost: 120.00,                 // Updated
    created_at: new Date("2024-08-20T10:28:31.333895"),
  },
  {
    id: 4,
    customer_id: 9,
    supermarket_id: 4,
    mode_of_payment: "Cash",
    total_cost: 240.10,  // Updated
    created_at: new Date("2024-08-20T10:28:31.333895"),
  },
  {
    id: 5,
    customer_id: 10,
    supermarket_id: 5,
    mode_of_payment: "Credit Card",
    total_cost: 180.20,  // Updated
    created_at: new Date("2024-08-20T10:28:31.333895"),
  },
  {
    id: 6,
    customer_id: 11,
    supermarket_id: 6,
    mode_of_payment: "Debit Card",  // Updated
    total_cost: 95.75,             // Updated
    created_at: new Date("2024-08-20T10:28:31.333895"),
  },
  {
    id: 7,
    customer_id: 12,
    supermarket_id: 7,
    mode_of_payment: "Mobile Payment",  // Updated
    total_cost: 210.55,                 // Updated
    created_at: new Date("2024-08-20T10:28:31.333895"),
  },
  {
    id: 8,
    customer_id: 13,
    supermarket_id: 8,
    mode_of_payment: "Cash",
    total_cost: 175.90,  // Updated
    created_at: new Date("2024-08-20T10:28:31.333895"),
  },
  {
    id: 9,
    customer_id: 14,
    supermarket_id: 9,
    mode_of_payment: "Credit Card",
    total_cost: 155.35,  // Updated
    created_at: new Date("2024-08-20T10:28:31.333895"),
  },
  {
    id: 10,
    customer_id: 15,
    supermarket_id: 10,
    mode_of_payment: "Debit Card",  // Updated
    total_cost: 130.80,            // Updated
    created_at: new Date("2024-08-20T10:28:31.333895"),
  }
];

// Function to insert data into Firestore
async function insertSupermarketdataTransactions() {
  const collectionRef = db.collection('supermarketdata_transactions');

  for (const transaction of supermarketdataTransactions) {
    const docRef = collectionRef.doc(transaction.id.toString());
    await docRef.set({
      customer_id: transaction.customer_id,
      supermarket_id: transaction.supermarket_id,
      mode_of_payment: transaction.mode_of_payment,
      total_cost: transaction.total_cost,
      created_at: transaction.created_at,
    });
    console.log(`Inserted transaction with ID: ${transaction.id}`);
  }

  console.log('All transactions have been inserted successfully.');
}

// Run the function
insertSupermarketdataTransactions().catch(console.error);
