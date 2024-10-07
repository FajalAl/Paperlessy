import React from 'react';
import styles from '../pages/UserReceipt.module.css';

const ReceiptComponent = ({ email, items, modeOfPayment, name, purchaseDate, supermarketName, totalCost }) => {
  return (
    <div className={styles.receiptContainer}>
      <div className={styles.receiptHeader}>
        {supermarketName} Receipt
      </div>

      <table className={styles.itemsTable}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.item_name}</td>
              <td>{item.quantity}</td>
              <td>${item.price_per_unit.toFixed(2)}</td>
              <td>${item.total_price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.totalCost}>
        Total Cost: ${totalCost.toFixed(2)}
      </div>

      <div className={styles.paymentInfo}>
        <span>Payment Mode: {modeOfPayment}</span>
        <span>Customer: {name}</span>
      </div>

      <div className={styles.purchaseDetails}>
        <span>Email: {email}</span>
        <span>Date: {purchaseDate}</span>
      </div>
    </div>
  );
};

export default ReceiptComponent;
