// Step 3.1: Import Firebase Admin SDK and Initialize the App
import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' }; // Replace with the path to your Firebase service account key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore
const db = admin.firestore();

// Step 3.2: Define the `supermarket_admins` data
const supermarketAdmins = [
  {
    "__id__": "1",
    "email": "john.doe@example.com",
    "id": 1,
    "name": "John Doe",
    "role": "Admin"
  },
  {
    "__id__": "2",
    "email": "jane.smith@example.com",
    "id": 2,
    "name": "Jane Smith",
    "role": "Admin"
  },
  {
    "__id__": "3",
    "email": "robert.johnson@example.com",
    "id": 3,
    "name": "Robert Johnson",
    "role": "Admin"
  },
  {
    "__id__": "4",
    "email": "emily.davis@example.com",
    "id": 4,
    "name": "Emily Davis",
    "role": "Admin"
  },
  {
    "__id__": "5",
    "email": "michael.williams@example.com",
    "id": 5,
    "name": "Michael Williams",
    "role": "Admin"
  }
];

// Step 3.3: Function to insert data into Firestore
async function insertSupermarketAdmins() {
  const collectionRef = db.collection('supermarket_admins');

  for (const admin of supermarketAdmins) {
    const docRef = collectionRef.doc(admin.__id__);
    await docRef.set({
      email: admin.email,
      id: admin.id,
      name: admin.name,
      role: admin.role
    });
    console.log(`Inserted admin with __id__: ${admin.__id__}`);
  }

  console.log('All admins have been inserted successfully.');
}

// Step 3.4: Run the function
insertSupermarketAdmins().catch(console.error);
