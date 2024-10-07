// Import Firebase Admin SDK and Initialize the App
import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' }; // Replace with the path to your Firebase service account key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore
const db = admin.firestore();

// Define the `supermarket_supermarkets` data
const supermarketSupermarkets = [
  {
    "id": 1,
    "name": "FreshMart",
    "location": "Nairobi, Kenya"
  },
  {
    "id": 2,
    "name": "GreenGrocer",
    "location": "Mombasa, Kenya"
  },
  {
    "id": 3,
    "name": "DailyMart",
    "location": "Kisumu, Kenya"
  },
  {
    "id": 4,
    "name": "UrbanBites",
    "location": "Nakuru, Kenya"
  },
  {
    "id": 5,
    "name": "SuperSaver",
    "location": "Eldoret, Kenya"
  },
  {
    "id": 6,
    "name": "EcoFoods",
    "location": "Thika, Kenya"
  },
  {
    "id": 7,
    "name": "ValueShop",
    "location": "Machakos, Kenya"
  },
  {
    "id": 8,
    "name": "QuickStop",
    "location": "Nyeri, Kenya"
  },
  {
    "id": 9,
    "name": "TownGrocer",
    "location": "Meru, Kenya"
  },
  {
    "id": 10,
    "name": "FarmFresh",
    "location": "Nanyuki, Kenya"
  }
];

// Function to insert data into Firestore
async function insertSupermarketSupermarkets() {
  const collectionRef = db.collection('supermarket_supermarkets');
  
  for (const supermarket of supermarketSupermarkets) {
    const docRef = collectionRef.doc(supermarket.id.toString());
    await docRef.set({
      name: supermarket.name,
      location: supermarket.location,
    });
    console.log(`Inserted supermarket with ID: ${supermarket.id}`);
  }

  console.log('All supermarkets have been inserted successfully.');
}

// Run the function
insertSupermarketSupermarkets().catch(console.error);
