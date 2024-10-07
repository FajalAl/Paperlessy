// Import Firebase Admin SDK and Initialize the App
import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' };

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Define the `supermarketdata_supermarkets` data
const supermarketdataSupermarkets = [
  {
    "id": 1,
    "name": "FreshMart",
    "operator_name": "Kamau",
    "created_at": new Date("2024-08-20T10:23:49.507Z")
  },
  {
    "id": 2,
    "name": "GreenGrocer",
    "operator_name": "Philip",
    "created_at": new Date("2024-08-20T10:23:49.507Z")
  },
  {
    "id": 3,
    "name": "DailyMart",
    "operator_name": "Miller",
    "created_at": new Date("2024-08-20T10:23:49.507Z")
  },
  {
    "id": 4,
    "name": "UrbanBites",
    "operator_name": "Fanice",
    "created_at": new Date("2024-08-20T10:23:49.507Z")
  },
  {
    "id": 5,
    "name": "SuperSaver",
    "operator_name": "Queen",
    "created_at": new Date("2024-08-20T10:23:49.507Z")
  },
  {
    "id": 6,
    "name": "EcoFoods",
    "operator_name": "Mutura",
    "created_at": new Date("2024-08-20T10:23:49.507Z")
  },
  {
    "id": 7,
    "name": "ValueShop",
    "operator_name": "Richard",
    "created_at": new Date("2024-08-20T10:23:49.507Z")
  },
  {
    "id": 8,
    "name": "QuickStop",
    "operator_name": "Nash",
    "created_at": new Date("2024-08-20T10:23:49.507Z")
  },
  {
    "id": 9,
    "name": "TownGrocer",
    "operator_name": "Paris",
    "created_at": new Date("2024-08-20T10:23:49.507Z")
  },
  {
    "id": 10,
    "name": "FarmFresh",
    "operator_name": "Wally",
    "created_at": new Date("2024-08-20T10:23:49.507Z")
  }
];

// Function to insert data into Firestore
async function insertSupermarketdataSupermarkets() {
  const collectionRef = db.collection('supermarketdata_supermarkets');
  
  for (const supermarket of supermarketdataSupermarkets) {
    const docRef = collectionRef.doc(supermarket.id.toString());
    await docRef.set({
      name: supermarket.name,
      operator_name: supermarket.operator_name,
      created_at: supermarket.created_at
    });
    console.log(`Inserted supermarket with ID: ${supermarket.id}`);
  }

  console.log('All supermarkets have been inserted successfully.');
}

// Run the function
insertSupermarketdataSupermarkets().catch(console.error);
