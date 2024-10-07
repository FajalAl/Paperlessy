import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Correct import for AuthContext
import styles from "./Login.module.css"; // Reuse the same styles for simplicity

const ResetPassword = () => {
    const { resetPassword } = useAuth();  // Ensure resetPassword is being destructured correctly
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleResetPassword = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await resetPassword(newPassword);  // Call the resetPassword function from context
            setSuccess("Password has been reset successfully.");
            setTimeout(() => navigate("/"), 3000); // Redirect after 3 seconds
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.login}>
            <img className={styles.image1Icon} alt="Background" src="/image-1@2x.png" />
            <main className={styles.loginContainer}>
                <h1 className={styles.headerText}>Reset Password</h1>
                <form className={styles.form} onSubmit={handleResetPassword}>
                    {error && <div className={styles.error}>{error}</div>}
                    {success && <div className={styles.success}>{success}</div>}
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="newPassword">New Password</label>
                        <input
                            className={styles.input}
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            className={styles.input}
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.primaryButton} type="submit">
                            Reset Password
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default ResetPassword;
