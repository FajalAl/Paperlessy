import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleNavigation = (path) => {
    if (path === "#learnMore") {
      document.querySelector(path).scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(path);
    }
  };

  return (
    <div className={styles.homepage}>
      <div className={styles.buttonsContainer}>
        <button className={styles.learnCryptoButton} onClick={() => handleNavigation("#learnMore")}>
          Learn Crypto
        </button>
        <button className={styles.transactionsButton} onClick={() => handleNavigation("/transact")}>
          Transactions
        </button>
        <button className={styles.receiptsButton} onClick={() => handleNavigation("/receipts")}>
          Receipts
        </button>
        <button className={styles.signUpButton} onClick={() => handleNavigation("/signup")}>
          Sign Up
        </button>
        <button className={styles.loginButton} onClick={() => handleNavigation("/login")}>
          Log In
        </button>
      </div>

      <section className={styles.welcomeSection} id="welcome">
        <h1 className={styles.welcomeTitle}>Welcome to Paperless</h1>
        <h2 className={styles.subTitle}>Empower Your Finances</h2>
      </section>

      <section className={styles.riskDisclosureContainer}>
        <h2 className={styles.riskDisclosureTitle}>Risk Disclosure</h2>
        <div className={styles.riskDisclosureSection}>
          <p>
            Past performance is not indicative of future results. Paperless does not provide investment advice and is not responsible for any financial decisions made by users. It is recommended to seek advice from a qualified financial advisor before participating in cryptocurrency trading.
          </p>
        </div>

        <div className={styles.riskDisclosureDetails}>
          <p>
            Cryptocurrency trading involves a high level of risk and may not be suitable for all investors. The volatile nature of the market can lead to substantial financial losses. It is important to understand the risks involved and consider your investment goals before engaging in cryptocurrency trading.
          </p>
        </div>
      </section>

      <section className={styles.learnMoreContainer} id="learnMore">
        <button className={styles.learnMoreButton} onClick={() => handleNavigation("/crypto")}>
          Learn More
        </button>
      </section>
    </div>
  );
};

export default HomePage;
