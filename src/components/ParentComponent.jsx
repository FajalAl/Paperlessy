import React from "react";
import { useParams } from "react-router-dom";
import UserReceipt from "../pages/UserReceipt";

const ParentComponent = () => {
  // Get receiptId from the URL parameters
  const { receiptId } = useParams();

  console.log("Parent component receiptId:", receiptId); // Debugging to check the receiptId

  return <UserReceipt receiptId={receiptId} />;
};

export default ParentComponent;
