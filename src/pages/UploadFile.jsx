import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UploadFile.module.css";

const UploadFile = () => {
  const navigate = useNavigate();

  const onPaperless31TextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

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
            <div className={styles.uploadSection}>
              <img
                className={styles.frameIcon}
                loading="lazy"
                alt=""
                src="/frame.svg"
              />
              <div className={styles.clickOrDrag}>
                Click or drag file to this area to upload
              </div>
            </div>
            <div className={styles.fileTypeText}>
              Formats accepted are.sql, .csv and .xlsx
            </div>
            <div className={styles.dividerLine} />
          </div>
          <div className={styles.button}>
            <button className={styles.secondaryButton}>
              <div className={styles.label}>Cancel</div>
            </button>
            <button className={styles.primaryButton}>
              <div className={styles.label1}>Continue</div>
            </button>
          </div>
          <h1 className={styles.uploadFiles}>Upload Files</h1>
        </section>
      </main>
    </div>
  );
};

export default UploadFile;
