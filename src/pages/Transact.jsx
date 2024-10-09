import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import { collection, doc, getDocs, getFirestore, query, runTransaction, where } from 'firebase/firestore'; // Firestore imports
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import styles from './Transact.module.css';

const Transact = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const auth = getAuth();
  const [senderNumber, setSenderNumber] = useState('');
  const [receiverNumber, setReceiverNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [transactionDetails, setTransactionDetails] = useState(null); // For transaction pop-up
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setAuthenticatedUser(user);
    } else {
      navigate('/login'); // Redirect to login if no authenticated user
    }
  }, [auth, navigate]);

  const onPaperlessTextClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleRecentTransactionsClick = () => {
    navigate('/transaction-history'); // Use navigate to redirect to TransactionHistory component
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const firestore = getFirestore();

    if (!authenticatedUser) {
      setError('No authenticated user found. Please log in.');
      return;
    }

    const senderNumberValid = /^\d{9}$/.test(senderNumber);
    const receiverNumberValid = /^\d{9}$/.test(receiverNumber);

    if (!senderNumberValid || !receiverNumberValid) {
      setError('Sender and receiver numbers must be exactly 9 digits.');
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount < 100 || numericAmount > 10000) {
      setError('Amount must be between 100 and 10,000.');
      return;
    }

    if (senderNumber === receiverNumber) {
      setError('Sender and receiver numbers cannot be the same.');
      return;
    }

    setError(''); // Clear any previous errors

    try {
      const userEmail = authenticatedUser.email;

      // Query merged_user_data collection to find the user by email
      const mergedUsersRef = collection(firestore, 'merged_user_data');
      const senderQuery = query(mergedUsersRef, where('email', '==', userEmail));
      const senderSnapshot = await getDocs(senderQuery);

      if (senderSnapshot.empty) {
        throw new Error('Authenticated user not found in merged_user_data.');
      }

      const senderDoc = senderSnapshot.docs[0];
      const senderData = senderDoc.data();
      const senderUserId = senderData.user_id;

      // Query merged_user_data collection to find the receiver by phone number
      const receiverQuery = query(mergedUsersRef, where('phone_number', '==', Number(receiverNumber)));
      const receiverSnapshot = await getDocs(receiverQuery);

      if (receiverSnapshot.empty) {
        throw new Error('Receiver does not exist in merged_user_data.');
      }

      const receiverDoc = receiverSnapshot.docs[0];
      const receiverData = receiverDoc.data();
      const receiverUserId = receiverData.user_id;

      // Start the Firestore transaction
      await runTransaction(firestore, async (transaction) => {
        const senderRef = doc(firestore, 'merged_user_data', senderUserId);
        const receiverRef = doc(firestore, 'merged_user_data', receiverUserId);

        const senderDoc = await transaction.get(senderRef);
        const receiverDoc = await transaction.get(receiverRef);

        if (!senderDoc.exists()) throw new Error('Sender does not exist in merged_user_data.');
        if (!receiverDoc.exists()) throw new Error('Receiver does not exist in merged_user_data.');

        const senderData = senderDoc.data();
        const receiverData = receiverDoc.data();

        if (senderData.balance < numericAmount) {
          throw new Error('Insufficient balance.');
        }

        const newSenderBalance = senderData.balance - numericAmount;
        const newReceiverBalance = receiverData.balance + numericAmount;
        const transactionFee = numericAmount < 1000 ? 2 : 5;

        transaction.update(senderRef, { balance: newSenderBalance });
        transaction.update(receiverRef, { balance: newReceiverBalance });

        // Log the transaction
        const transactionData = {
          amount: numericAmount,
          created_at: new Date(),
          fee: transactionFee,
          receiver_phone: receiverData.phone_number,
          sender_phone: senderData.phone_number,
        };

        // Generate a document ID for the transaction
        const transactionDocRef = doc(collection(firestore, 'transactions_transactions'));
        const docId = transactionDocRef.id;

        // Store the transaction with the generated document ID
        await transaction.set(transactionDocRef, { docId, ...transactionData });

        // Update the transaction details for the pop-up
        setTransactionDetails({
          amount: numericAmount,
          fee: transactionFee,
          receiverPhone: receiverData.phone_number,
          senderPhone: senderData.phone_number,
          date: new Date().toLocaleString(),
        });
      });

      setResponseMessage('Transaction successful!');
      // Clear form fields after transaction
      setSenderNumber('');
      setReceiverNumber('');
      setAmount('');
    } catch (error) {
      console.error('Error during transaction:', error);
      setError(error.message);
    }
  };

  return (
    <div className={styles.transact}>
      <section className={styles.frameParent}>
        <div className={styles.paperlessWrapper}>
          <h1 className={styles.paperless} onClick={onPaperlessTextClick}>
            Paperless
          </h1>
        </div>
        <div className={styles.transactionWrapper}>
          <h1 className={styles.transaction}>Transaction</h1>
        </div>
        <button className={styles.recentTransactionsButton} onClick={handleRecentTransactionsClick}>
          Recent Transactions
        </button>
      </section>
      <section className={styles.phoneNumberInputWrapper}>
        <div className={styles.phoneNumberInput}>
          <div className={styles.backgroundParent}>
            <img className={styles.backgroundIcon} loading="lazy" alt="" src="/background@2x.png" />
            <div className={styles.enterThePhoneContainer}>
              <ol className={styles.enterThePhoneNumberOfThe}>
                <li className={styles.enterThePhone}>Enter the phone number of the sender and receiver.</li>
                <li className={styles.enterThePhone}>Enter the Amount you wish to send.</li>
                <li className={styles.enterThePhone}>Check sender's phone and enter the PIN.</li>
                <li>Click Send</li>
              </ol>
            </div>
          </div>
          <div className={styles.emailInputs}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="senderNumber">Sender's Number</label>
                <input
                  className={styles.inputField}
                  id="senderNumber"
                  name="senderNumber"
                  type="text"
                  placeholder="SENDER’S NUMBER"
                  value={senderNumber}
                  onChange={(e) => setSenderNumber(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="receiverNumber">Receiver's Number</label>
                <input
                  className={styles.inputField}
                  id="receiverNumber"
                  name="receiverNumber"
                  type="text"
                  placeholder="RECEIVER'S NUMBER"
                  value={receiverNumber}
                  onChange={(e) => setReceiverNumber(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="amount">Amount</label>
                <input
                  className={styles.inputField}
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="AMOUNT"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="100"
                  max="10000"
                  required
                />
                {error && <div className={styles.error}>{error}</div>}
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.sendButton} type="submit">
                  SEND
                </button>
              </div>
            </form>
            {responseMessage && <div className={styles.success}>{responseMessage}</div>}
          </div>
        </div>
      </section>
      {transactionDetails && (
        <div className={styles.transactionPopUp}>
          <h2 className={styles.popUpHeading}>Transaction History</h2>
          <p className={styles.popUpDetails}>Amount: KSH {transactionDetails.amount.toFixed(2)}</p>
          <p className={styles.popUpDetails}>Fee: KSH {transactionDetails.fee.toFixed(2)}</p>
          <p className={styles.popUpDetails}>Receiver Phone: +254 {transactionDetails.receiverPhone}</p>
          <p className={styles.popUpDetails}>Sender Phone: +254 {transactionDetails.senderPhone}</p>
          <p className={styles.popUpDetails}>Date: {transactionDetails.date}</p>
        </div>
      )}
    </div>
  );
};

export default Transact;
