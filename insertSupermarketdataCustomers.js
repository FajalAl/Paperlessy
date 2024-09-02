// Import Firebase Admin SDK and Initialize the App
import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' }; // Replace with the path to your Firebase service account key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Define the `supermarketdata_customers` data
const supermarketdataCustomers = [
  {
    "id": 6,
    "phone_number": "0700123456",
    "email": "alice.brown@example.com",
    "created_at": new Date("2024-08-20T10:19:25.620418")
  },
  {
    "id": 7,
    "phone_number": "0700234567",
    "email": "charlie.jones@example.com",
    "created_at": new Date("2024-08-20T10:19:25.620418")
  },
  {
    "id": 8,
    "phone_number": "0700345678",
    "email": "david.miller@example.com",
    "created_at": new Date("2024-08-20T10:19:25.620418")
  },
  {
    "id": 9,
    "phone_number": "0700456789",
    "email": "sarah.wilson@example.com",
    "created_at": new Date("2024-08-20T10:19:25.620418")
  },
  {
    "id": 10,
    "phone_number": "0700567890",
    "email": "james.moore@example.com",
    "created_at": new Date("2024-08-20T10:19:25.620418")
  },
  {
    "id": 11,
    "phone_number": "0700678901",
    "email": "linda.taylor@example.com",
    "created_at": new Date("2024-08-20T10:19:25.620418")
  },
  {
    "id": 12,
    "phone_number": "0700789012",
    "email": "kevin.anderson@example.com",
    "created_at": new Date("2024-08-20T10:19:25.620418")
  },
  {
    "id": 13,
    "phone_number": "0700890123",
    "email": "laura.thomas@example.com",
    "created_at": new Date("2024-08-20T10:19:25.620418")
  },
  {
    "id": 14,
    "phone_number": "0700901234",
    "email": "henry.jackson@example.com",
    "created_at": new Date("2024-08-20T10:19:25.620418")
  },
  {
    "id": 15,
    "phone_number": "0700912345",
    "email": "olivia.white@example.com",
    "created_at": new Date("2024-08-20T10:19:25.620418")
  }
];

// Function to insert data into Firestore
async function insertSupermarketdataCustomers() {
  const collectionRef = db.collection('supermarketdata_customers');
  
  for (const customer of supermarketdataCustomers) {
    const docRef = collectionRef.doc(customer.id.toString());
    await docRef.set({
      phone_number: customer.phone_number,
      email: customer.email,
      created_at: customer.created_at
    });
    console.log(`Inserted customer with ID: ${customer.id}`);
  }

  console.log('All customers have been inserted successfully.');
}

// Run the function
insertSupermarketdataCustomers().catch(console.error);
