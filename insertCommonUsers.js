// Step 3.1: Import Firebase Admin SDK and Initialize the App
import admin from 'firebase-admin';
import serviceAccount from './src/firebase/serviceAccountKey.json' assert { type: 'json' }; // Replace with the path to your Firebase service account key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Firestore
const db = admin.firestore();

// Step 3.2: Define the `common_users` data
const commonUsers = [
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
  },
  {
    "__id__": "6",
    "email": "alice.brown@example.com",
    "id": 6,
    "name": "Alice Brown",
    "role": "User"
  },
  {
    "__id__": "7",
    "email": "charlie.jones@example.com",
    "id": 7,
    "name": "Charlie Jones",
    "role": "User"
  },
  {
    "__id__": "8",
    "email": "david.miller@example.com",
    "id": 8,
    "name": "David Miller",
    "role": "User"
  },
  {
    "__id__": "9",
    "email": "sarah.wilson@example.com",
    "id": 9,
    "name": "Sarah Wilson",
    "role": "User"
  },
  {
    "__id__": "10",
    "email": "james.moore@example.com",
    "id": 10,
    "name": "James Moore",
    "role": "User"
  },
  {
    "__id__": "11",
    "email": "linda.taylor@example.com",
    "id": 11,
    "name": "Linda Taylor",
    "role": "User"
  },
  {
    "__id__": "12",
    "email": "kevin.anderson@example.com",
    "id": 12,
    "name": "Kevin Anderson",
    "role": "User"
  },
  {
    "__id__": "13",
    "email": "laura.thomas@example.com",
    "id": 13,
    "name": "Laura Thomas",
    "role": "User"
  },
  {
    "__id__": "14",
    "email": "henry.jackson@example.com",
    "id": 14,
    "name": "Henry Jackson",
    "role": "User"
  },
  {
    "__id__": "15",
    "email": "olivia.white@example.com",
    "id": 15,
    "name": "Olivia White",
    "role": "User"
  },
  {
    "__id__": "16",
    "email": "george.harris@example.com",
    "id": 16,
    "name": "George Harris",
    "role": "User"
  },
  {
    "__id__": "17",
    "email": "emma.martin@example.com",
    "id": 17,
    "name": "Emma Martin",
    "role": "User"
  },
  {
    "__id__": "18",
    "email": "noah.thompson@example.com",
    "id": 18,
    "name": "Noah Thompson",
    "role": "User"
  },
  {
    "__id__": "19",
    "email": "sophia.garcia@example.com",
    "id": 19,
    "name": "Sophia Garcia",
    "role": "User"
  },
  {
    "__id__": "20",
    "email": "liam.martinez@example.com",
    "id": 20,
    "name": "Liam Martinez",
    "role": "User"
  },
  {
    "__id__": "21",
    "email": "isabella.robinson@example.com",
    "id": 21,
    "name": "Isabella Robinson",
    "role": "User"
  },
  {
    "__id__": "22",
    "email": "mason.lee@example.com",
    "id": 22,
    "name": "Mason Lee",
    "role": "User"
  },
  {
    "__id__": "23",
    "email": "mia.walker@example.com",
    "id": 23,
    "name": "Mia Walker",
    "role": "User"
  },
  {
    "__id__": "24",
    "email": "benjamin.young@example.com",
    "id": 24,
    "name": "Benjamin Young",
    "role": "User"
  },
  {
    "__id__": "25",
    "email": "ella.hall@example.com",
    "id": 25,
    "name": "Ella Hall",
    "role": "User"
  },
  {
    "__id__": "26",
    "email": "lucas.allen@example.com",
    "id": 26,
    "name": "Lucas Allen",
    "role": "User"
  },
  {
    "__id__": "27",
    "email": "amelia.king@example.com",
    "id": 27,
    "name": "Amelia King",
    "role": "User"
  },
  {
    "__id__": "28",
    "email": "ethan.wright@example.com",
    "id": 28,
    "name": "Ethan Wright",
    "role": "User"
  },
  {
    "__id__": "29",
    "email": "harper.scott@example.com",
    "id": 29,
    "name": "Harper Scott",
    "role": "User"
  },
  {
    "__id__": "30",
    "email": "alexander.clark@example.com",
    "id": 30,
    "name": "Alexander Clark",
    "role": "User"
  },
  
];

// Step 3.3: Function to insert data into Firestore and Firebase Auth
async function insertCommonUsers() {
  const collectionRef = db.collection('common_users');

  for (const user of commonUsers) {
    const docRef = collectionRef.doc(user.__id__);

    // Insert data into Firestore
    await docRef.set({
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role
    });
    console.log(`Inserted user with __id__: ${user.__id__} into Firestore.`);

    // Create user in Firebase Authentication
    const userRecord = {
      uid: user.__id__, // Use __id__ as UID
      email: user.email,
      password: 'defaultPassword123!', // Set a default password, user should change it later
      displayName: user.name,
      disabled: false
    };

    try {
      await admin.auth().createUser(userRecord);
      console.log(`User ${user.email} created successfully in Firebase Authentication.`);
    } catch (error) {
      if (error.code === 'auth/email-already-exists' || error.code === 'auth/uid-already-exists') {
        console.log(`User ${user.email} already exists in Firebase Authentication.`);
      } else {
        console.error('Error creating user in Firebase Authentication:', error);
      }
    }
  }

  console.log('All users have been processed successfully.');
}

// Step 3.4: Run the function
insertCommonUsers().catch(console.error);
