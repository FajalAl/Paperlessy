// Import Firebase Admin SDK and Initialize the App
import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' }; // Replace with the path to your Firebase service account key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Define the `supermarket_users` data
const supermarketUsers = [
  {
    "id": 6,
    "email": "alice.brown@example.com",
    "created_at": new Date("2024-08-20T10:02:09.222129"),
    "role": "User",
    "supermarket_id": 1
  },
  {
    "id": 7,
    "email": "charlie.jones@example.com",
    "created_at": new Date("2024-08-20T10:02:09.222129"),
    "role": "User",
    "supermarket_id": 2
  },
  {
    "id": 8,
    "email": "david.miller@example.com",
    "created_at": new Date("2024-08-20T10:02:09.222129"),
    "role": "User",
    "supermarket_id": 3
  },
  {
    "id": 9,
    "email": "sarah.wilson@example.com",
    "created_at": new Date("2024-08-20T10:02:09.222129"),
    "role": "User",
    "supermarket_id": 4
  },
  {
    "id": 10,
    "email": "james.moore@example.com",
    "created_at": new Date("2024-08-20T10:02:09.222129"),
    "role": "User",
    "supermarket_id": 5
  },
  {
    "id": 11,
    "email": "linda.taylor@example.com",
    "created_at": new Date("2024-08-20T10:02:09.222129"),
    "role": "User",
    "supermarket_id": 6
  },
  {
    "id": 12,
    "email": "kevin.anderson@example.com",
    "created_at": new Date("2024-08-20T10:02:09.222129"),
    "role": "User",
    "supermarket_id": 7
  },
  {
    "id": 13,
    "email": "laura.thomas@example.com",
    "created_at": new Date("2024-08-20T10:02:09.222129"),
    "role": "User",
    "supermarket_id": 8
  },
  {
    "id": 14,
    "email": "henry.jackson@example.com",
    "created_at": new Date("2024-08-20T10:02:09.222129"),
    "role": "User",
    "supermarket_id": 9
  },
  {
    "id": 15,
    "email": "olivia.white@example.com",
    "created_at": new Date("2024-08-20T10:02:09.222129"),
    "role": "User",
    "supermarket_id": 10
  }
];

// Function to insert data into Firestore
async function insertSupermarketUsers() {
  const collectionRef = db.collection('supermarket_users');
  
  for (const user of supermarketUsers) {
    const docRef = collectionRef.doc(user.id.toString());
    await docRef.set({
      email: user.email,
      created_at: user.created_at,
      role: user.role,
      supermarket_id: user.supermarket_id
    });
    console.log(`Inserted user with ID: ${user.id}`);
  }

  console.log('All users have been inserted successfully.');
}

// Run the function
insertSupermarketUsers().catch(console.error);
