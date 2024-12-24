"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use 'next/navigation' for Next.js 13+
import styles from "../components/LoginForm.module.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Router hook (safe to use since we're in the client environment)
  const router = useRouter();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    setIsLoading(true);
    setError(""); // Reset any previous errors

    const body = JSON.stringify({ username, password });

    try {
      const response = await fetch(
        "https://ygf8fotvt3.execute-api.us-west-2.amazonaws.com/Prod/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );

      const data = await response.json();
      const dataBody = data.body ? JSON.parse(data.body) : null;

      if (!response.ok) {
        // Handle failed response from API
        setError(dataBody?.message || "Login failed. Please try again.");
        return;
      }

      if (typeof window !== "undefined" && dataBody?.sessionId) {
        localStorage.setItem("sessionId", dataBody.sessionId);
        console.log("Logged in successfully");
        router.push(`/main`);
      } else {
        setError("No session ID returned.");
      }
      
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error(err);
      console.log("error logging in:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.welcomeContainer}>
        <div className={styles.welcomeText}>
          <div className={styles.lineBig}>Welcome</div>
          <div className={styles.highlightLine}>
            <span className={styles.welcomeHighlight}>to the First Annual</span>
          </div>
          <div className={styles.line}>Kartchner Fam</div>
          <div className={styles.line}>12 Days</div>
          <div className={styles.line}>of Christmas</div>
          <div className={styles.line}>Challenge</div>
        </div>
      </div>

      {/* Login Form Container */}
      <div className={styles.loginFormContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.mb3}>
            <label className={styles.formLabel}>Username</label>
            <input
              type="text"
              className={styles.formControl}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className={styles.mb3}>
            <label className={styles.formLabel}>Password</label>
            <input
              type="password"
              className={styles.formControl}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <button type="submit" className={styles.btn} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <div className={`${styles.alert} ${styles.mt3}`}>{error}</div>}
      </div>
    </div>
  );
}

export default LoginForm;
