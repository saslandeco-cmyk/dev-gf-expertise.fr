"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        background: "#18181b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <form
        action={formAction}
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 8,
          width: 320,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <h1 style={{ fontSize: 18, margin: "0 0 8px" }}>Connexion admin</h1>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          required
          style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
        />
        {state?.error ? <p style={{ color: "#c0392b", margin: 0, fontSize: 14 }}>{state.error}</p> : null}
        <button
          type="submit"
          disabled={pending}
          style={{
            padding: 10,
            background: "#18181b",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {pending ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
