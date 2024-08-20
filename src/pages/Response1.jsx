import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Response1.module.css";

const Response1 = () => {
  const navigate = useNavigate();

  const onPaperlessTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.response}>
      <a className={styles.paperless} onClick={onPaperlessTextClick}>
        Paperless
      </a>
      <section className={styles.thankYouForContainer}>
        <p className={styles.thankYouFor}>{`Thank you for using Paperless`}</p>
        <p className={styles.thankYouFor}>&nbsp;</p>
        <p className={styles.thankYouFor}>&nbsp;</p>
        <p className={styles.thankYouFor}>&nbsp;</p>
        <p className={styles.yourReceiptWill}>
          Your receipt will be emailed to you shortly
        </p>
      </section>
    </div>
  );
};

export default Response1;
