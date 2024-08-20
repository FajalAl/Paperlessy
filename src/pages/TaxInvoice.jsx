import React, { useState } from 'react';
import styles from "./TaxInvoice.module.css";

const TaxInvoice = () => {
  const [invoiceData, setInvoiceData] = useState({
    supermarketName: "Supermarket Name",
    date: "04-04-2022 11:30",
    operator: "ABRAHAMS, LEIGH-RIN",
    modeOfPayment: "773299960",
    cashBackEarned: "0.23",
    slipNo: "61788.002001",
    items: [
      {
        description: "MINERAL WATER STILL",
        qty: 1,
        price: 22.99,
      },
    ],
  });

  const calculateTotal = () => {
    return invoiceData.items.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2);
  };

  return (
    <div className={styles.taxInvoice}>
      <div className={styles.supermarketNameWrapper}>
        <a className={styles.supermarketName}>{invoiceData.supermarketName}</a>
      </div>
      
      <section className={styles.dateInfoWrapper}>
        <div className={styles.dateInfo}>
          <b className={styles.dateOperatorModeContainer}>
            <p className={styles.date}>Date:</p>
            <p className={styles.date}>{invoiceData.date}</p>
            <p className={styles.date}>Operator:</p>
            <p className={styles.date}>{invoiceData.operator}</p>
            <p className={styles.date}>Mode Of Payment:</p>
            <p className={styles.date}>{invoiceData.modeOfPayment}</p>
            <p className={styles.date}>CashBack Earned:</p>
            <p className={styles.date}>{invoiceData.cashBackEarned}</p>
            <p className={styles.date}>Slip No:</p>
            <p className={styles.date}>{invoiceData.slipNo}</p>
          </b>
        </div>
      </section>

      <div className={styles.itemsHeaderWrapper}>
        {invoiceData.items.map((item, index) => (
          <div className={styles.itemsHeader} key={index}>
            <div className={styles.descriptionMineralWaterContainer}>
              <p className={styles.date}>
                <b className={styles.description}>Description:</b> {item.description}
              </p>
            </div>
            <div className={styles.descriptionMineralWaterContainer}>
              <p className={styles.date}>
                <b>QTY:</b> {item.qty}
              </p>
            </div>
            <div className={styles.priceInclVatContainer}>
              <p className={styles.date}>
                <b>Price (Incl Vat):</b> {item.price.toFixed(2)} #
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.totalWrapper}>
        <p className={styles.date}>
          <b>Total:</b> {calculateTotal()} #
        </p>
      </div>
      
      <section className={styles.separatorWrapper}>
        <img
          className={styles.separatorIcon}
          loading="lazy"
          alt="separator"
          src="/rectangle-131@2x.png"
        />
      </section>
      
      <div className={styles.bigFillWrapper}>
        <button className={styles.bigFill}>
          <div className={styles.buttonShape} />
          <div className={styles.signUp}>DOWNLOAD</div>
        </button>
      </div>
    </div>
  );
};

export default TaxInvoice;
