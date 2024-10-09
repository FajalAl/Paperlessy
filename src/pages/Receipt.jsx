import React, { useState } from 'react';
import styles from './Receipt.module.css'; // Assuming you have a CSS module for styling
import { addUserDataToFirestore, getReceiptDetails } from './getReceiptDetails';

const Receipt = () => {
  const [userFormVisible, setUserFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  });

  // Sample transaction data
  const transactionData = {
    admin_id: null,
    created_at: "2024-10-07T00:20:02.916Z",
    customer_id: "10",
    docId: "10",
    email: "james.moore@example.com",
    items: [
      { item_name: "Apples", price_per_unit: 5, quantity: 10, total_price: 50 },
      { item_name: "Bananas", price_per_unit: 3, quantity: 15, total_price: 45 },
      { item_name: "Oranges", price_per_unit: 5.25, quantity: 11, total_price: 55.75 },
    ],
    mode_of_payment: "Credit Card",
    name: "James Moore",
    purchase_date: "16 August 2024 at 03:00:00 UTC+3",
    receipt_data: "Receipt Data for James Moore",
    receipt_id: "5",
    role: "User",
    supermarket_id2: "5",
    supermarket_name: "SuperSaver",
    total_cost: 180.2,
    total_price: 150.75,
    total_quantity: 36,
    user_id: "10"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUserDataToFirestore(formData);
    setUserFormVisible(false); // Hide the form after submission
  };

  const fetchReceipt = async () => {
    const receipts = await getReceiptDetails({
      supermarketName: 'SuperSaver',
      date: '16 August 2024 at 03:00:00 UTC+3',
      setUserFormVisible,
      setFormData
    });
    console.log('Receipts:', receipts);
  };

  // Format the date into human-readable format
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-GB');

  return (
    <div className={styles.receiptContainer}>
      <h1>Supermarket Receipts</h1>
      <button onClick={fetchReceipt}>Fetch Receipts</button>

      {/* User Form */}
      {userFormVisible && (
        <form onSubmit={handleSubmit} className={styles.userForm}>
          <h2>Fill in your details to retrieve the receipt</h2>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}

      {/* Receipt Display */}
      {!userFormVisible && (
        <>
          <header className={styles.receiptHeader}>
            <div className={styles.receiptTitle}>
              <h1>Receipt</h1>
            </div>
            <div className={styles.receiptNumber}>
              <p>No <strong>R-{transactionData.receipt_id.padStart(5, '0')}</strong></p>
              <p>Date: {formatDate(transactionData.created_at)}</p>
            </div>
          </header>

          <section className={styles.receiptSection}>
            <h3>RECEIVER</h3>
            <p><strong>Name:</strong> {transactionData.name}</p>
            <p><strong>Phone Number:</strong> (254)070001002</p> {/* Placeholder phone */}
            <p><strong>Email:</strong> {transactionData.email}</p>
            <p><strong>Address:</strong> Wall, Happy Village<br />
              Nairobi, Westgate, 80112<br />
              Kenya
            </p>
          </section>

          <section className={styles.receiptSection}>
            <h3>ORDER DETAILS</h3>
            <table className={styles.orderDetails}>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactionData.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.item_name} ({item.price_per_unit} x {item.quantity})</td>
                    <td>KSH{item.total_price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className={styles.receiptFooter}>
            <p><strong>Total:</strong> ${transactionData.total_price.toFixed(2)}</p>
            <p><strong>Payment Method:</strong> {transactionData.mode_of_payment}</p>
            <p><strong>Signature:</strong></p>
            <div className={styles.signatureBox}>
              <svg height="60" width="200" className={styles.signature}>
                <path d="M20 20 C 40 30, 60 10, 80 30 S 120 40, 140 20" stroke="blue" fill="transparent" />
              </svg>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Receipt;
