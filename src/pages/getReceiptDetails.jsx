import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig.js';

async function getReceiptDetails({ supermarketName, date }) {
  try {
    const userId = await getAuthenticatedUserId();  // Ensure you fetch the authenticated user's ID

    const receiptQuery = query(
      collection(db, 'supermarket_receipts'),
      where('supermarket_name', '==', supermarketName),
      where('purchase_date', '==', date),
      where('user_id', '==', userId) // Ensure this is the correct field matching the authenticated user
    );
    const receiptSnap = await getDocs(receiptQuery);

    if (receiptSnap.empty) {
      return []; // No receipts found
    }

    // Continue processing receipts as before
    const receipts = await Promise.all(receiptSnap.docs.map(async (doc) => {
      const receiptData = doc.data();
      const receiptId = doc.id;

      const purchasesQuery = query(
        collection(db, 'supermarket_purchases'),
        where('receipt_id', '==', receiptId)
      );
      const purchasesSnap = await getDocs(purchasesQuery);
      const purchases = purchasesSnap.docs.map(doc => doc.data());

      const userRef = doc(db, 'common_users', userId); // Adjust to use userId
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        throw new Error('User not found');
      }
      const userData = userSnap.data();

      const transactionQuery = query(
        collection(db, 'supermarketdata_transactions'),
        where('customer_id', '==', userId) // Adjust to use userId
      );
      const transactionSnap = await getDocs(transactionQuery);
      const transactionData = transactionSnap.docs.map(doc => doc.data())[0];

      const supermarketRef = doc(db, 'supermarketdata_supermarkets', receiptData.supermarket_id);
      const supermarketSnap = await getDoc(supermarketRef);
      if (!supermarketSnap.exists()) {
        throw new Error('Supermarket not found');
      }
      const supermarketData = supermarketSnap.data();

      return {
        supermarketName: receiptData.supermarket_name,
        date: receiptData.purchase_date,
        operator: supermarketData.operator_name,
        modeOfPayment: transactionData?.mode_of_payment ?? 'N/A',
        cashBackEarned: "0.23",
        slipNo: receiptId,
        items: purchases.map(purchase => ({
          description: purchase.item_name,
          qty: purchase.quantity,
          price: purchase.total_price
        }))
      };
    }));

    return receipts;
  } catch (error) {
    console.error('Error fetching receipt details:', error);
    throw error;
  }
}

export default getReceiptDetails;
