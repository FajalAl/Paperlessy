// Import Firebase Admin SDK and Initialize the App
import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' };

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Define the `transactions_users` data
const transactionsUsers = [
  {
    "id": 2,
    "phone_number": "0701000001",
    "balance": 100.00,
    "created_at": new Date("2024-08-18T10:00:00")
  },
  {
    "id": 3,
    "phone_number": "0701000002",
    "balance": 150.00,
    "created_at": new Date("2024-08-18T10:05:00")
  },
  {
    "id": 4,
    "phone_number": "0701000003",
    "balance": 200.00,
    "created_at": new Date("2024-08-18T10:10:00")
  },
  {
    "id": 5,
    "phone_number": "0701000004",
    "balance": 250.00,
    "created_at": new Date("2024-08-18T10:15:00")
  },
  {
    "id": 6,
    "phone_number": "0701000005",
    "balance": 300.00,
    "created_at": new Date("2024-08-18T10:20:00")
  },
  {
    "id": 7,
    "phone_number": "0701000006",
    "balance": 350.00,
    "created_at": new Date("2024-08-18T10:25:00")
  },
  {
    "id": 8,
    "phone_number": "0701000007",
    "balance": 400.00,
    "created_at": new Date("2024-08-18T10:30:00")
  },
  {
    "id": 9,
    "phone_number": "0701000008",
    "balance": 450.00,
    "created_at": new Date("2024-08-18T10:35:00")
  },
  {
    "id": 10,
    "phone_number": "0701000009",
    "balance": 500.00,
    "created_at": new Date("2024-08-18T10:40:00")
  },
  {
    "id": 11,
    "phone_number": "0701000010",
    "balance": 550.00,
    "created_at": new Date("2024-08-18T10:45:00")
  },
  {
    "id": 12,
    "phone_number": "0722000001",
    "balance": 100.00,
    "created_at": new Date("2024-08-18T11:00:00")
  },
  {
    "id": 13,
    "phone_number": "0722000002",
    "balance": 150.00,
    "created_at": new Date("2024-08-18T11:05:00")
  },
  {
    "id": 14,
    "phone_number": "0722000003",
    "balance": 200.00,
    "created_at": new Date("2024-08-18T11:10:00")
  },
  {
    "id": 15,
    "phone_number": "0722000004",
    "balance": 250.00,
    "created_at": new Date("2024-08-18T11:15:00")
  },
  {
    "id": 16,
    "phone_number": "0722000005",
    "balance": 300.00,
    "created_at": new Date("2024-08-18T11:20:00")
  },
  {
    "id": 17,
    "phone_number": "0722000006",
    "balance": 350.00,
    "created_at": new Date("2024-08-18T11:25:00")
  },
  {
    "id": 18,
    "phone_number": "0722000007",
    "balance": 400.00,
    "created_at": new Date("2024-08-18T11:30:00")
  },
  {
    "id": 19,
    "phone_number": "0722000008",
    "balance": 450.00,
    "created_at": new Date("2024-08-18T11:35:00")
  },
  {
    "id": 20,
    "phone_number": "0722000009",
    "balance": 500.00,
    "created_at": new Date("2024-08-18T11:40:00")
  },
  {
    "id": 21,
    "phone_number": "0722000010",
    "balance": 550.00,
    "created_at": new Date("2024-08-18T11:45:00")
  },
  {
    "id": 22,
    "phone_number": "0740000001",
    "balance": 100.00,
    "created_at": new Date("2024-08-18T12:00:00")
  },
  {
    "id": 23,
    "phone_number": "0740000002",
    "balance": 150.00,
    "created_at": new Date("2024-08-18T12:05:00")
  },
  {
    "id": 24,
    "phone_number": "0740000003",
    "balance": 200.00,
    "created_at": new Date("2024-08-18T12:10:00")
  },
  {
    "id": 25,
    "phone_number": "0740000004",
    "balance": 250.00,
    "created_at": new Date("2024-08-18T12:15:00")
  },
  {
    "id": 26,
    "phone_number": "0740000005",
    "balance": 300.00,
    "created_at": new Date("2024-08-18T12:20:00")
  },
  {
    "id": 27,
    "phone_number": "0740000006",
    "balance": 350.00,
    "created_at": new Date("2024-08-18T12:25:00")
  },
  {
    "id": 28,
    "phone_number": "0740000007",
    "balance": 400.00,
    "created_at": new Date("2024-08-18T12:30:00")
  },
  {
    "id": 29,
    "phone_number": "0740000008",
    "balance": 450.00,
    "created_at": new Date("2024-08-18T12:35:00")
  },
  {
    "id": 30,
    "phone_number": "0740000009",
    "balance": 500.00,
    "created_at": new Date("2024-08-18T12:40:00")
  },
  {
    "id": 31,
    "phone_number": "0740000010",
    "balance": 550.00,
    "created_at": new Date("2024-08-18T12:45:00")
  }
];

// Function to insert data into Firestore
async function insertTransactionsUsers() {
  const collectionRef = db.collection('transactions_users');
  
  for (const user of transactionsUsers) {
    const docRef = collectionRef.doc(user.id.toString());
    await docRef.set({
      phone_number: user.phone_number,
      balance: user.balance,
      created_at: user.created_at
    });
    console.log(`Inserted user with ID: ${user.id}`);
  }

  console.log('All users have been inserted successfully.');
}

// Run the function
insertTransactionsUsers().catch(console.error);
