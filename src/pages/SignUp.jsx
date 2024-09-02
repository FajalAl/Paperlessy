import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import styles from "./SignUp.module.css";

const SignUp = () => {
    const { signUp } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            await signUp(email, password);
            navigate("/login");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={styles.signup}>
            <img className={styles.image1Icon} alt="Background" src="/image-1@2x.png" />
            
            <main className={styles.signUpForm}>
                <h1 className={styles.headerText} onClick={() => navigate("/")}>
                    Paperless
                </h1>
                <form className={styles.form} onSubmit={handleSignUp}>
                    {error && <div className={styles.error}>{error}</div>}
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <input
                            className={styles.input}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="password">Password</label>
                        <input
                            className={styles.input}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.primaryButton} type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className={styles.loginRedirect}>
                    Already have an account?{" "}
                    <span className={styles.loginLink} onClick={() => navigate("/login")}>
                        Log in
                    </span>
                </p>
            </main>
        </div>
    );
};

export default SignUp;
