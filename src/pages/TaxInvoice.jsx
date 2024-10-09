/*import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
//import getReceiptDetails from './getReceiptDetails'; // Adjust the import path
import styles from "./TaxInvoice.module.css";

// Utility to parse query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TaxInvoice = () => {
  const query = useQuery();
  const [invoiceData, setInvoiceData] = useState(null);
  const [error, setError] = useState(null);

  const supermarketName = query.get('supermarketName');
  const date = query.get('date'); // Use only the 'date' from receipts.jsx

  /*useEffect(() => {
    //const fetchData = async () => {
      //try {
        const data = await getReceiptDetails({ supermarketName, date });
  
        if (data.length === 0) {
          setError('No receipts available for the specified criteria.');
        } else {
          setInvoiceData(data[0]); // Assuming you want the first matching receipt
        }
      } catch (error) {
        console.error('Error fetching receipt data:', error);
        setError('An error occurred while fetching the receipt.');
      }
    };
  
    fetchData();
  }, [supermarketName, date]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!invoiceData) {
    return <p>Loading...</p>;
  }

  // Ensure invoiceData.items is a valid array before reducing
  const calculateTotal = () => {
    if (!Array.isArray(invoiceData.items)) return "0.00"; // Return 0 if items is not an array
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
        {invoiceData.items && invoiceData.items.length > 0 ? (
          invoiceData.items.map((item, index) => (
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
          ))
        ) : (
          <p>No items found for the selected criteria.</p>
        )}
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
}; */

//export default TaxInvoice;
