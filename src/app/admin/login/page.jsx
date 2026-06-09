"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const password = formData.get("password");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    if (res.ok) {
      window.location.href = "/admin";
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)'}}>
      <div className="card" style={{width: '100%', maxWidth: '400px'}}>
        <h2 className="mb-3 text-center">Admin Login</h2>
        {error && <div style={{color: 'red', marginBottom: '1rem', textAlign: 'center'}}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group mb-4">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-input" required />
            <p className="text-light" style={{fontSize: '0.8rem', marginTop: '0.5rem'}}>Default password is: admin123</p>
          </div>
          <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Login</button>
        </form>
      </div>
    </div>
  );
}
