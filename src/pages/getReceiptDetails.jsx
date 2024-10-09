import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig.js';

// Fetches receipts from Firestore based on supermarket name, date, and user ID
async function getReceiptDetails({ supermarketName, date, setUserFormVisible }) {
  try {
    const userId = await getAuthenticatedUserId(); // Assumes an authenticated user ID is available

    // Query Firestore for supermarket receipts
    const receiptQuery = query(
      collection(db, 'supermarket_receipts'),
      where('supermarket_name', '==', supermarketName),
      where('purchase_date', '==', date),
      where('user_id', '==', userId)
    );

    const receiptSnap = await getDocs(receiptQuery);

    // If no receipts found, show the form for the user to submit their data
    if (receiptSnap.empty) {
      setUserFormVisible(true);
      return [];
    }

    // Map through the fetched receipts
    const receipts = receiptSnap.docs.map((doc) => {
      const receiptData = doc.data();
      return {
        supermarketName: receiptData.supermarket_name,
        date: receiptData.purchase_date,
        items: receiptData.items,
        receiptId: doc.id
      };
    });

    return receipts;
  } catch (error) {
    console.error('Error fetching receipt details:', error);
    throw error;
  }
}

// Adds user data to Firestore in case no receipt is found
async function addUserDataToFirestore(userData) {
  try {
    const userId = await getAuthenticatedUserId(); // Assumes user ID is available
    const newUser = {
      created_at: new Date().toISOString(),
      email: userData.email,
      name: userData.name,
      user_id: userId
    };

    await addDoc(collection(db, 'supermarket_users'), newUser);
    console.log('User data added successfully:', newUser);
  } catch (error) {
    console.error('Error adding user data:', error);
  }
}

export { addUserDataToFirestore, getReceiptDetails };

