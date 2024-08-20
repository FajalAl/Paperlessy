import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Receipts.module.css";

const Receipts = () => {
  const navigate = useNavigate();

  const onPaperlessTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onReceiveEReceiptClick = useCallback(() => {
    navigate("/home-page-enter-phone-number");
  }, [navigate]);

  return (
    <div className={styles.receipts}>
        <section className={styles.frameParent}>
          <div className={styles.paperlessWrapper}>
            <h1 className={styles.paperless} onClick={onPaperlessTextClick}>
              Paperless
            </h1>
          </div>
          <div className={styles.receiptsWrapper}>
            <h1 className={styles.receiptsText}>Receipts</h1>
          </div>
          <h1 className={styles.receiveEReceipt} onClick={onReceiveEReceiptClick}>
            Receive an E-receipt
          </h1>
        </section>

      <main className={styles.mainContent}>
        <h3 className={styles.fillTheForm}>Fill the form to receive an E-receipt</h3>
        <form className={styles.form} onSubmit={onReceiveEReceiptClick}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="supermarket">Supermarket</label>
            <input
              className={styles.input}
              id="supermarket"
              name="supermarket"
              type="text"
              placeholder="Enter supermarket name"
              required
            />
          </div>
          <div className={styles.dateGroup}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="fromDate">From</label>
              <input
                className={styles.input}
                id="fromDate"
                name="fromDate"
                type="date"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="toDate">To</label>
              <input
                className={styles.input}
                id="toDate"
                name="toDate"
                type="date"
                required
              />
            </div>
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
