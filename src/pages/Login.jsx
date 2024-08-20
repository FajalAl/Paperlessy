import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    //const auth = getAuth();
    
    //signInWithEmailAndPassword(auth, email, password)
      //.then((userCredential) => {
        // Signed in
        //const user = userCredential.user;
        //console.log("Logged in as:", user.email);
        //navigate("/homepage");
      //})
     // .catch((error) => {
       // const errorCode = error.code;
       // const errorMessage = error.message;
       // setError(errorMessage);
       // console.error("Login error:", errorCode, errorMessage);
      //});
  };

  const onPaperless4TextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

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
      </main>
    </div>
  );
};

export default Login;
