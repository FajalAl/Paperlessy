import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Receipts.module.css";
import backgroundImage from "/rrr.png"; // Import the background image

const Receipts = () => {
  const [supermarketName, setSupermarketName] = useState("");
  const [date, setDate] = useState(""); // Single date state
  const navigate = useNavigate();

  const onPaperlessTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onReceiveEReceiptClick = useCallback(
    async (event) => {
      event.preventDefault();

      if (supermarketName && date) {
        // Navigate to TaxInvoice with query parameters or use state
        navigate(`/tax-invoice?supermarketName=${supermarketName}&date=${date}`);
      } else {
        // Handle empty form submission
        alert("Please fill in all fields.");
      }
    },
    [navigate, supermarketName, date]
  );

  return (
    <div className={styles.receipts}>
      <section
        className={styles.frameParent}
        style={{ backgroundImage: `url(${backgroundImage})` }} // Add background image
      >
        <div className={styles.receiptsWrapper}>
          <h1 className={styles.receiptsText}>Receipts</h1>
        </div>
        <div className={styles.paperlessWrapper}>
          <h1 className={styles.paperless} onClick={onPaperlessTextClick}>
            Paperless
          </h1>
        </div>
        <div className={styles.receiveEReceiptWrapper}>
          <h1 className={styles.receiveEReceipt}>Receive an E-receipt</h1>
        </div>
      </section>

      <main className={styles.mainContent}>
        <h3 className={styles.fillTheForm}>Fill the form to receive an E-receipt</h3>
        <form className={styles.form} onSubmit={onReceiveEReceiptClick}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="supermarket">
              Supermarket
            </label>
            <input
              className={styles.input}
              id="supermarket"
              name="supermarket"
              type="text"
              placeholder="Enter supermarket name"
              required
              value={supermarketName}
              onChange={(e) => setSupermarketName(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="date">
              Date
            </label>
            <input
              className={styles.input}
              id="date"
              name="date"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.primaryButton} type="submit">
              Get Receipt
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Receipts;
