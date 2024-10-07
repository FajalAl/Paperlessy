// src/pages/SomePage.jsx
import React, { useEffect, useState } from "react";
import { getData, setData } from "../firebase/firestore";

const SomePage = () => {
  const [data, setDataState] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData("your-collection", "your-doc-id");
      setDataState(result);
    };

    fetchData();
    }, []);

    const handleSaveData = async () => {
    await setData("your-collection", "your-doc-id", { example: "data" });
    };

    return (
    <div>
        <h1>Data from Firestore:</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <button onClick={handleSaveData}>Save Data</button>
    </div>
    );
};

export default SomePage;
