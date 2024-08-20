import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Response2.module.css";

const Response2 = () => {
  const navigate = useNavigate();

  const onPaperlessTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.response1}>
      <div className={styles.paperless} onClick={onPaperlessTextClick}>
        Paperless
      </div>
      <section className={styles.frameParent}>
        <div className={styles.successIconContainerParent}>
          <div className={styles.successIconContainer}>
            <img
              className={styles.successIcon}
              loading="lazy"
              alt=""
              src="/success-icon.svg"
            />
          </div>
          <div className={styles.paymentMessageContainerParent}>
            <div className={styles.paymentMessageContainer}>
              <div className={styles.paymentSuccess}>Payment Success!</div>
            </div>
            <div className={styles.textParent}>
              <b className={styles.text}>
                <p className={styles.blankLine}>&nbsp;</p>
                <p className={styles.blankLine1}>&nbsp;</p>
              </b>
              <div className={styles.kshWrapper}>
                <div className={styles.ksh}>KSH ****</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.paymentDetailsWrapper}>
          <div className={styles.paymentDetails}>
            <div className={styles.detailsRow}>
              <div className={styles.paymentDetail}>
                <div className={styles.refNumber}>Ref Number</div>
                <div className={styles.refTimeSender}>000085752257</div>
              </div>
              <div className={styles.paymentDetail}>
                <div className={styles.paymentTime}>Payment Time</div>
                <div className={styles.div}>25-02-2024, 13:22:16</div>
              </div>
              <div className={styles.paymentDetail2} />
              <div className={styles.paymentDetail}>
                <div className={styles.senderName}>Sender Name</div>
                <div className={styles.favourJaleng}>Favour Jaleng</div>
              </div>
            </div>
            <div className={styles.detailsSeparator} />
            <div className={styles.amountRow}>
              <div className={styles.paymentDetail4}>
                <div className={styles.amount}>Amount</div>
                <div className={styles.ksh1}>KSH****</div>
              </div>
              <div className={styles.paymentDetail4}>
                <div className={styles.adminFee}>Admin Fee</div>
                <div className={styles.ksh200}>KSH.2.00</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Response2;
