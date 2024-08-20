import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Transact.module.css";

const Transact = () => {
  const navigate = useNavigate();
  const [senderNumber, setSenderNumber] = useState("");
  const [receiverNumber, setReceiverNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(""); // State for error messages

  const onPaperlessTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Validate sender and receiver numbers
    const senderNumberValid = /^\d{10}$/.test(senderNumber);
    const receiverNumberValid = /^\d{10}$/.test(receiverNumber);
    if (!senderNumberValid || !receiverNumberValid) {
      setError("Sender and receiver numbers must be exactly 10 digits.");
      return;
    }

    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount < 100 || numericAmount > 10000) {
      setError("Amount must be between 100 and 10,000.");
      return;
    }

    // Clear error if validation passes
    setError("");

    // Handle transaction data
    console.log("Transaction data:", { senderNumber, receiverNumber, amount });
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
                <li className={styles.enterThePhone}>
                  Enter the phone number of the sender and receiver.
                </li>
                <li className={styles.enterThePhone}>
                  Enter the Amount you wish to send.
                </li>
                <li className={styles.enterThePhone}>
                  Check sender's phone and enter the PIN
                </li>
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
                {error && <div className={styles.error}>{error}</div>}
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.sendButton} type="submit">
                  SEND
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transact;
