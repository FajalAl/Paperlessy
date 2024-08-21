import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import styles from "./Login.module.css";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await login(email, password);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    const onPaperless4TextClick = useCallback(() => {
        navigate("/");
    }, [navigate]);

    const handleSignUpRedirect = () => {
        navigate("/signup");
    };

    return (
        <div className={styles.login}>
            <img className={styles.image1Icon} alt="Background" src="/image-1@2x.png" />
            
            <main className={styles.loginContainer}>
                <h1 className={styles.headerText} onClick={onPaperless4TextClick}>
                    Paperless
                </h1>
                <form className={styles.form} onSubmit={handleLogin}>
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
                    <div className={styles.buttonContainer}>
                        <button className={styles.primaryButton} type="submit">
                            Log In
                        </button>
                    </div>
                </form>
                <p className={styles.signUpPrompt}>
                    Don't have an account?{" "}
                    <span className={styles.signUpLink} onClick={handleSignUpRedirect}>
                        Sign Up
                    </span>
                </p>
            </main>
        </div>
    );
};

export default Login;
