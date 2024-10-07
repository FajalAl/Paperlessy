// Step 3.1: Import Firebase Admin SDK and Initialize the App
import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' }; // Replace with the path to your Firebase service account key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore
const db = admin.firestore();

// Step 3.2: Define the supermarket_purchases data
const supermarketPurchases = [
  {
    "id": 1,
    "receipt_id": 1,
    "item_name": "Apples",
    "quantity": 10,
    "price_per_unit": 5.00,
    "total_price": 50.00,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 2,
    "receipt_id": 1,
    "item_name": "Bananas",
    "quantity": 15,
    "price_per_unit": 3.00,
    "total_price": 45.00,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 3,
    "receipt_id": 1,
    "item_name": "Oranges",
    "quantity": 11,
    "price_per_unit": 5.25,
    "total_price": 55.75,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 4,
    "receipt_id": 2,
    "item_name": "Tomatoes",
    "quantity": 10,
    "price_per_unit": 3.50,
    "total_price": 35.00,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 5,
    "receipt_id": 2,
    "item_name": "Carrots",
    "quantity": 15,
    "price_per_unit": 3.37,
    "total_price": 50.50,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 6,
    "receipt_id": 3,
    "item_name": "Milk",
    "quantity": 20,
    "price_per_unit": 2.50,
    "total_price": 50.00,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 7,
    "receipt_id": 3,
    "item_name": "Bread",
    "quantity": 10,
    "price_per_unit": 7.00,
    "total_price": 70.00,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 8,
    "receipt_id": 4,
    "item_name": "Chicken",
    "quantity": 10,
    "price_per_unit": 15.00,
    "total_price": 150.00,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 9,
    "receipt_id": 4,
    "item_name": "Rice",
    "quantity": 5,
    "price_per_unit": 18.02,
    "total_price": 90.10,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 10,
    "receipt_id": 5,
    "item_name": "Eggs",
    "quantity": 24,
    "price_per_unit": 3.00,
    "total_price": 72.00,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 11,
    "receipt_id": 5,
    "item_name": "Cheese",
    "quantity": 6,
    "price_per_unit": 18.70,
    "total_price": 108.20,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 12,
    "receipt_id": 6,
    "item_name": "Butter",
    "quantity": 7,
    "price_per_unit": 5.75,
    "total_price": 40.25,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 13,
    "receipt_id": 6,
    "item_name": "Bread",
    "quantity": 5,
    "price_per_unit": 11.10,
    "total_price": 55.50,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 14,
    "receipt_id": 7,
    "item_name": "Beef",
    "quantity": 5,
    "price_per_unit": 35.00,
    "total_price": 175.00,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 15,
    "receipt_id": 7,
    "item_name": "Pepper",
    "quantity": 5,
    "price_per_unit": 7.11,
    "total_price": 35.55,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 16,
    "receipt_id": 8,
    "item_name": "Rice",
    "quantity": 5,
    "price_per_unit": 18.00,
    "total_price": 90.00,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 17,
    "receipt_id": 8,
    "item_name": "Fish",
    "quantity": 2,
    "price_per_unit": 42.95,
    "total_price": 85.90,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 18,
    "receipt_id": 9,
    "item_name": "Beef",
    "quantity": 7,
    "price_per_unit": 20.00,
    "total_price": 140.00,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 19,
    "receipt_id": 9,
    "item_name": "Pepper",
    "quantity": 5,
    "price_per_unit": 3.07,
    "total_price": 15.35,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 20,
    "receipt_id": 10,
    "item_name": "Chicken",
    "quantity": 5,
    "price_per_unit": 20.00,
    "total_price": 100.00,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  },
  {
    "id": 21,
    "receipt_id": 10,
    "item_name": "Tomatoes",
    "quantity": 5,
    "price_per_unit": 6.16,
    "total_price": 30.80,
    "created_at": new Date("2024-08-20T10:13:46.22683")
  }
];

// Step 3.3: Function to insert data into Firestore
async function insertSupermarketPurchases() {
  const collectionRef = db.collection('supermarket_purchases');
  
  for (const purchase of supermarketPurchases) {
    const docRef = collectionRef.doc(purchase.id.toString());
    await docRef.set({
      receipt_id: purchase.receipt_id,
      item_name: purchase.item_name,
      quantity: purchase.quantity,
      price_per_unit: purchase.price_per_unit,
      total_price: purchase.total_price,
      created_at: purchase.created_at,
    });
    console.log(`Inserted purchase with ID: ${purchase.id}`);
  }

  console.log('All purchases have been inserted successfully.');
}

// Step 3.4: Run the function
insertSupermarketPurchases().catch(console.error);
