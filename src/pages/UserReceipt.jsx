// src/pages/UserReceipt.jsx

import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { collection, getDocs, query, where } from "firebase/firestore"; // Import Firestore functions
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase/firebaseConfig"; // Import Firestore instance
import styles from "./UserReceipt.module.css"; // Import CSS module for styling

const UserReceipt = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const supermarketName = params.get("supermarketName");
  const date = params.get("date");

  const [receiptData, setReceiptData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        const user = getAuth().currentUser; // Get the current user
        if (!user) {
          alert("You need to be logged in to view receipts.");
          return;
        }

        const userEmail = user.email; // Get the user's email
        const receiptQuery = query(
          collection(db, "final_combined_data"),
          where("email", "==", userEmail),
          where("supermarket_name", "==", supermarketName),
          where("purchase_date", "==", date)
        );

        const snapshot = await getDocs(receiptQuery);

        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          setReceiptData(data);
        } else {
          alert("No receipt found for the given criteria.");
        }
      } catch (error) {
        console.error("Error fetching receipt data:", error);
        setError("An error occurred while fetching the receipt.");
      } finally {
        setLoading(false);
      }
    };

    fetchReceiptData();
  }, [supermarketName, date]);

  if (loading) {
    return <div>Loading receipt...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!receiptData) {
    return <div>No receipt data available.</div>;
  }

  return (
    <div className={styles.receiptContainer}>
      <h1 className={styles.receiptTitle}>Receipt</h1>
      <div className={styles.receiptDetails}>
        <p><strong>Supermarket:</strong> {receiptData.supermarket_name}</p>
        <p><strong>Date:</strong> {new Date(receiptData.purchase_date).toLocaleString()}</p>
        <p><strong>Total Cost:</strong> ${receiptData.total_cost.toFixed(2)}</p>
        <p><strong>Items:</strong></p>
        <ul>
          {receiptData.items.map((item, index) => (
            <li key={index}>
              {item.quantity} x {item.item_name} @ ${item.price_per_unit.toFixed(2)} each - Total: ${item.total_price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserReceipt;
