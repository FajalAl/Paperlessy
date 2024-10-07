// Step 3.1: Import Firebase Admin SDK and Initialize the App
import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' }; // Replace with the path to your Firebase service account key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore
const db = admin.firestore();

// Step 3.2: Define the `supermarket_receipts` data
const supermarketReceipts = [
  {
    "__id__": "1",
    "user_id": 6,
    "supermarket_name": "FreshMart",
    "purchase_date": new Date("2024-08-20"),
    "total_cost": 150.75,
    "receipt_data": "Receipt Data for Alice Brown",
    "created_at": new Date("2024-08-20T10:05:46.387553"),
    "admin_id": null
  },
  {
    "__id__": "2",
    "user_id": 7,
    "supermarket_name": "GreenGrocer",
    "purchase_date": new Date("2024-08-19"),
    "total_cost": 85.50,
    "receipt_data": "Receipt Data for Charlie Jones",
    "created_at": new Date("2024-08-20T10:05:46.387553"),
    "admin_id": null
  },
  {
    "__id__": "3",
    "user_id": 8,
    "supermarket_name": "DailyMart",
    "purchase_date": new Date("2024-08-18"),
    "total_cost": 120.00,
    "receipt_data": "Receipt Data for David Miller",
    "created_at": new Date("2024-08-20T10:05:46.387553"),
    "admin_id": null
  },
  {
    "__id__": "4",
    "user_id": 9,
    "supermarket_name": "UrbanBites",
    "purchase_date": new Date("2024-08-17"),
    "total_cost": 240.10,
    "receipt_data": "Receipt Data for Sarah Wilson",
    "created_at": new Date("2024-08-20T10:05:46.387553"),
    "admin_id": null
  },
  {
    "__id__": "5",
    "user_id": 10,
    "supermarket_name": "SuperSaver",
    "purchase_date": new Date("2024-08-16"),
    "total_cost": 180.20,
    "receipt_data": "Receipt Data for James Moore",
    "created_at": new Date("2024-08-20T10:05:46.387553"),
    "admin_id": null
  },
  {
    "__id__": "6",
    "user_id": 11,
    "supermarket_name": "EcoFoods",
    "purchase_date": new Date("2024-08-15"),
    "total_cost": 95.75,
    "receipt_data": "Receipt Data for Linda Taylor",
    "created_at": new Date("2024-08-20T10:05:46.387553"),
    "admin_id": null
  },
  {
    "__id__": "7",
    "user_id": 12,
    "supermarket_name": "ValueShop",
    "purchase_date": new Date("2024-08-14"),
    "total_cost": 210.55,
    "receipt_data": "Receipt Data for Kevin Anderson",
    "created_at": new Date("2024-08-20T10:05:46.387553"),
    "admin_id": null
  },
  {
    "__id__": "8",
    "user_id": 13,
    "supermarket_name": "QuickStop",
    "purchase_date": new Date("2024-08-13"),
    "total_cost": 175.90,
    "receipt_data": "Receipt Data for Laura Thomas",
    "created_at": new Date("2024-08-20T10:05:46.387553"),
    "admin_id": null
  },
  {
    "__id__": "9",
    "user_id": 14,
    "supermarket_name": "TownGrocer",
    "purchase_date": new Date("2024-08-12"),
    "total_cost": 155.35,
    "receipt_data": "Receipt Data for Henry Jackson",
    "created_at": new Date("2024-08-20T10:05:46.387553"),
    "admin_id": null
  },
  {
    "__id__": "10",
    "user_id": 15,
    "supermarket_name": "FarmFresh",
    "purchase_date": new Date("2024-08-11"),
    "total_cost": 130.80,
    "receipt_data": "Receipt Data for Olivia White",
    "created_at": new Date("2024-08-20T10:05:46.387553"),
    "admin_id": null
  }
];

// Step 3.3: Function to insert data into Firestore
async function insertSupermarketReceipts() {
  const collectionRef = db.collection('supermarket_receipts');
  
  for (const receipt of supermarketReceipts) {
    const docRef = collectionRef.doc(receipt.__id__);
    await docRef.set({
      user_id: receipt.user_id,
      supermarket_name: receipt.supermarket_name,
      purchase_date: receipt.purchase_date,
      total_cost: receipt.total_cost,
      receipt_data: receipt.receipt_data,
      created_at: receipt.created_at,
      admin_id: receipt.admin_id
    });
    console.log(`Inserted receipt with __id__: ${receipt.__id__}`);
  }

  console.log('All receipts have been inserted successfully.');
}

// Step 3.4: Run the function
insertSupermarketReceipts().catch(console.error);
