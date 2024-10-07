import { doc, getFirestore, runTransaction } from "firebase/firestore"; // Import necessary Firestore functions 
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Transact.module.css";

const Transact = () => {
  const navigate = useNavigate();
  const [senderNumber, setSenderNumber] = useState(""); // State for sender's phone number
  const [receiverNumber, setReceiverNumber] = useState(""); // State for receiver's phone number
  const [amount, setAmount] = useState(""); // State for transaction amount
  const [error, setError] = useState(""); // State for error messages
  const [responseMessage, setResponseMessage] = useState(""); // State for transaction response message

  const onPaperlessTextClick = useCallback(() => {
    navigate("/"); // Navigate to the homepage
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const firestore = getFirestore();

    // Validate sender and receiver numbers (must be 9 digits)
    const senderNumberValid = /^\d{9}$/.test(senderNumber); 
    const receiverNumberValid = /^\d{9}$/.test(receiverNumber); 
    if (!senderNumberValid || !receiverNumberValid) {
      setError("Sender and receiver numbers must be exactly 9 digits.");
      return;
    }

    const numericAmount = parseFloat(amount); // Parse the amount to a number
    if (isNaN(numericAmount) || numericAmount < 100 || numericAmount > 10000) {
      setError("Amount must be between 100 and 10,000.");
      return;
    }

    // Clear error if validation passes
    setError("");

    // Firestore transaction logic
    try {
      console.log("Sender Number:", senderNumber); // Debugging
      console.log("Receiver Number:", receiverNumber); // Debugging

      await runTransaction(firestore, async (transaction) => {
        const senderRef = doc(firestore, "transactions_users", senderNumber); // Reference to the sender
        const receiverRef = doc(firestore, "transactions_users", receiverNumber); // Reference to the receiver
        
        console.log("Sender Reference:", senderRef); // Debugging
        console.log("Receiver Reference:", receiverRef); // Debugging
        
        const senderDoc = await transaction.get(senderRef);
        const receiverDoc = await transaction.get(receiverRef);

        if (!senderDoc.exists()) {
          throw new Error("Sender does not exist.");
        }

        if (!receiverDoc.exists()) {
          throw new Error("Receiver does not exist.");
        }

        const senderData = senderDoc.data();
        const receiverData = receiverDoc.data();

        // Check if the sender has sufficient balance
        if (senderData.balance < numericAmount) {
          throw new Error("Insufficient balance.");
        }

        // Update balances
        const newSenderBalance = senderData.balance - numericAmount; // Deduct amount from sender's balance
        const newReceiverBalance = receiverData.balance + numericAmount; // Add amount to receiver's balance

        transaction.update(senderRef, { balance: newSenderBalance }); // Update sender's balance
        transaction.update(receiverRef, { balance: newReceiverBalance }); // Update receiver's balance

        // Create a new transaction record
        const transactionData = {
          amount: numericAmount,
          created_at: new Date(), // Current date and time
          fee: numericAmount < 1000 ? 2 : 5, // Fee structure
          receiver_phone: Number(receiverNumber), // Convert to number
          sender_phone: Number(senderNumber), // Convert to number
        };
        await transaction.set(doc(firestore, "transactions_transactions"), transactionData); // Save transaction record
      });

      setResponseMessage("Transaction successful!"); // Set success message
    } catch (error) {
      console.error("Error during transaction:", error);
      setError(error.message); // Set error message
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
        <h1 className={styles.recentTransactions}>Recent Transactions</h1>
      </section>
      <section className={styles.phoneNumberInputWrapper}>
        <div className={styles.phoneNumberInput}>
          <div className={styles.backgroundParent}>
            <img
              className={styles.backgroundIcon}
              loading="lazy"
              alt=""
              src="/background@2x.png"
            />
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
                  min="100" // Minimum value for the amount
                  max="10000" // Maximum value for the amount
                  required
                />
                {error && <div className={styles.error}>{error}</div>} {/* Display error message */}
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.sendButton} type="submit">
                  SEND
                </button>
              </div>
            </form>
            {responseMessage && <div className={styles.responseMessage}>{responseMessage}</div>} {/* Display response message */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transact;
