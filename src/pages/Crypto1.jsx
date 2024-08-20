import React from "react";
import { Link } from "react-router-dom";
import styles from "./Crypto1.module.css";

const Crypto1 = () => {
  return (
    <div className={styles.crypto}>
      <section className={styles.introSection}>
        <div className={styles.introContent}>
          <h2 className={styles.title}>
            Cryptocurrency enables decentralized transactions with enhanced security, lower fees compared to traditional banking, and provides financial services to the unbanked.
          </h2>
          <h3 className={styles.subTitle}>
            Getting Started in Crypto Trading
          </h3>

          <div className={styles.resources}>
            <ul className={styles.resourceList}>
              <li>Read <strong>'Mastering Bitcoin'</strong> by Andreas M. Antonopoulos for foundational knowledge.</li>
              <li>Stay updated with news from <strong>CoinDesk</strong> and <strong>CoinTelegraph</strong>.</li>
              <li>Begin your trading journey on <strong>Binance</strong> – a leading cryptocurrency exchange.</li>
            </ul>
          </div>
        </div>
        <div className={styles.imageSection}>
          <img
            className={styles.cryptoImage}
            src="/138f54a6237a48018c662a709e67f924-1@2x.png"
            alt="Cryptocurrency"
          />
        </div>
      </section>

      <section className={styles.videoSection}>
        <h4 className={styles.videoTitle}>
          Watch This Tutorial to Get Started with Binance
        </h4>
        <iframe
          className={styles.video}
          src="https://www.youtube.com/embed/IZWrAbFveSA"
          title="Binance Tutorial for Beginners"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </section>

      <section className={styles.ctaSection}>
        <h4 className={styles.ctaTitle}>
          Ready to Dive into Crypto Trading?
        </h4>
        <p className={styles.ctaText}>
          Explore more resources, tutorials, and trading tools to start your journey in the cryptocurrency world.
        </p>
        <Link to="/login" className={styles.ctaButton}>
          Explore Resources
        </Link>
      </section>
    </div>
  );
};

export default Crypto1;
