import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePageEnterPhoneNumber.module.css";

const HomePageEnterPhoneNumber = () => {
  const navigate = useNavigate();

  const handleFormSubmit = useCallback((event) => {
    event.preventDefault();
    navigate("/response");
  }, [navigate]);

  return (
    <div className={styles.homePageEnterPhoneNumber}>
      <header className={styles.header}>
        <b className={styles.headerText}>
          Please enter the following details so that we can send you your receipt
        </b>
      </header>

      <main className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="name">Name</label>
            <input
              className={styles.input}
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="phone">Phone Number</label>
            <input
              className={styles.input}
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.primaryButton} type="submit">
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default HomePageEnterPhoneNumber;
