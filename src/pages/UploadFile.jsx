import { deleteObject, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import styles from "./UploadFile.module.css";

const UploadFile = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState("");

  const storage = getStorage();

  useEffect(() => {
    if (currentUser && currentUser.email === "admin_paperless@example.com") {
      fetchUploadedFiles();
    }
  }, [currentUser]);

  const onPaperless31TextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("No file selected.");
      return;
    }

    try {
      const storageRef = ref(storage, `uploads/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      alert("File uploaded successfully");
      fetchUploadedFiles(); // Refresh the file list
    } catch (uploadError) {
      setError(uploadError.message);
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      const listRef = ref(storage, "uploads/");
      const result = await listAll(listRef);
      setUploadedFiles(result.items);
    } catch (fetchError) {
      setError(fetchError.message);
    }
  };

  const handleDelete = async (fileRef) => {
    try {
      await deleteObject(fileRef);
      fetchUploadedFiles(); // Refresh the file list
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  return (
    <div className={styles.uploadfile}>
      <a className={styles.paperless31} onClick={onPaperless31TextClick}>
        Paperless
      </a>
      <main className={styles.uploadFileWrapper}>
        <section className={styles.uploadFile}>
          <div className={styles.header}>
            <div className={styles.title}>File Upload</div>
          </div>
          <div className={styles.content}>
            <input
              type="file"
              onChange={handleFileChange}
              className={styles.fileInput}
            />
            <div className={styles.fileTypeText}>
              Formats accepted are .sql, .csv, and .xlsx
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.dividerLine} />
            <div className={styles.button}>
              <button className={styles.secondaryButton} onClick={() => setSelectedFile(null)}>
                <div className={styles.label}>Cancel</div>
              </button>
              <button className={styles.primaryButton} onClick={handleUpload}>
                <div className={styles.label1}>Upload</div>
              </button>
            </div>
            <h1 className={styles.uploadFiles}>Uploaded Files</h1>
            {currentUser && currentUser.email === "admin_paperless@example.com" && (
              <div className={styles.fileList}>
                {uploadedFiles.map((fileRef) => (
                  <div key={fileRef.fullPath} className={styles.fileItem}>
                    <span>{fileRef.name}</span>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(fileRef)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UploadFile;
