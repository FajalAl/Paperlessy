import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styles from './TransactionHistory.module.css'; // Importing the CSS module

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [firstTransaction, setFirstTransaction] = useState(null); // To hold the first transaction

  useEffect(() => {
    const fetchTransactionsAndUser = async () => {
      const firestore = getFirestore();
      const auth = getAuth();

      // Get authenticated user info
      const user = auth.currentUser;
      if (user) {
        const phoneNumber = user.phoneNumber ? user.phoneNumber.slice(4) : ''; // Assuming phone number starts with '+254'
        setUserPhoneNumber(phoneNumber);
      }

      // Fetch transaction data
      const transactionsRef = collection(firestore, 'transactions_transactions');
      const transactionSnapshot = await getDocs(transactionsRef);
      const transactionList = transactionSnapshot.docs.map(doc => ({
        docId: doc.id,
        ...doc.data(),
      }));

      // Set the first transaction (assumed to be the first transaction in the fetched list)
      if (transactionList.length > 0) {
        setFirstTransaction(transactionList[0]);
      }

      // Filter transactions to only show those related to the authenticated user
      const userTransactions = transactionList.filter(
        (transaction) =>
          transaction.sender_phone === userPhoneNumber || transaction.receiver_phone === userPhoneNumber
      );

      setTransactions(userTransactions);
    };

    fetchTransactionsAndUser();
  }, [userPhoneNumber]);

  return (
    <div className={styles['transaction-history']}>
      <h2 className={styles['transaction-history-title']}>Transaction History</h2>
      
      {/* Display the first transaction */}
      {firstTransaction && (
        <div className={styles['transaction-details']} key={firstTransaction.docId}>
          <div className={styles['column']}>
            <p><strong>Amount:</strong> KSH {firstTransaction.amount.toFixed(2)}</p>
            <p><strong>Fee:</strong> KSH {firstTransaction.fee.toFixed(2)}</p>
            <p><strong>Sender Phone:</strong> +254 {firstTransaction.sender_phone}</p>
          </div>
          <div className={styles['column']}>
            <p><strong>Receiver Phone:</strong> +254 {firstTransaction.receiver_phone}</p>
            <p><strong>Date:</strong> {new Date(firstTransaction.created_at).toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* Display user-specific transactions */}
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div className={styles['transaction-details']} key={transaction.docId}>
            <div className={styles['column']}>
              <p><strong>Amount:</strong> KSH {transaction.amount.toFixed(2)}</p>
              <p><strong>Fee:</strong> KSH {transaction.fee.toFixed(2)}</p>
              <p><strong>Sender Phone:</strong> +254 {transaction.sender_phone}</p>
            </div>
            <div className={styles['column']}>
              <p><strong>Receiver Phone:</strong> +254 {transaction.receiver_phone}</p>
              <p><strong>Date:</strong> {new Date(transaction.created_at).toLocaleString()}</p>
            </div>
          </div>
        ))
      ) : (
        <p className={styles['no-transactions']}>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionHistory;
