"use client";

import LoginForm from '../app/components/LoginForm';  
import styles from '../app/page.module.css';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  // useSessionCleanup();
  
  return (
    <div className={styles.main}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <LoginForm/>
    </div>
  );
}
