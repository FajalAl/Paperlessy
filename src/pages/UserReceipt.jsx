import React, { useState } from 'react';
import { addUserDataToFirestore, getReceiptDetails } from './getReceiptDetails';
import styles from './UserReceipt.module.css';

const UserReceipt = () => {
  const [userFormVisible, setUserFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  });
  const [receipts, setReceipts] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUserDataToFirestore(formData);
      setUserFormVisible(false); // Hide form after submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const fetchReceipt = async () => {
    try {
      const receiptDetails = await getReceiptDetails({
        supermarketName: 'SuperSaver',
        date: '16 August 2024 at 03:00:00 UTC+3',
        setUserFormVisible,
      });
      setReceipts(receiptDetails);
    } catch (error) {
      console.error('Error fetching receipts:', error);
    }
  };

  return (
    <div>
      <h1>Supermarket Receipts</h1>
      <button onClick={fetchReceipt}>Fetch Receipts</button>

      {userFormVisible && (
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Fill in your details to retrieve the receipt</h2>
            <div className={styles.formField}>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className={styles.formField}>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <button className={styles.submitButton} type="submit">Submit</button>
          </form>
        </div>
      )}

      {receipts.length > 0 && receipts.map((receipt, index) => (
        <div key={index} className={styles.receiptContainer}>
          <header className={styles.receiptHeader}>
            <h2>Receipt No R-{receipt.slipNo}</h2>
            <p>{receipt.date}</p>
          </header>

          <section className={styles.purchaseDetails}>
            <h3>Items Purchased:</h3>
            <table className={styles.itemsTable}>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {receipt.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.description}</td>
                    <td>{item.qty}</td>
                    <td>{item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      ))}
    </div>
  );
};

export default UserReceipt;
