import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Adjust the path if needed
import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Use AuthContext to get currentUser
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
        navigate("/login"); // Redirect to login if not logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleNavigation = (path) => {
    if (path === "#learnMore") {
      document.querySelector(path).scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(path);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(getAuth());
      navigate("/login");
    } catch (error) {
      console.error("Sign out error:", error);
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
        <button className={styles.receiptsButton} onClick={() => handleNavigation("/receipt")}>
          Receipts
        </button>
        {userLoggedIn ? (
          <button className={styles.signUpButton} onClick={handleSignOut}>
            Log Out
          </button>
        ) : (
          <button className={styles.signUpButton} onClick={() => handleNavigation("/signup")}>
            Sign Up
          </button>
        )}
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
