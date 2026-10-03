"use client";

import type { SubmitEvent } from "react";
import AuthForm, { AuthInput } from "./AuthForm";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/");
  }

  return (
    <AuthForm
      topMsg="Good to see you again"
      panelTitle="Your next favorite is waiting."
      panelDescription="Sign in to pick up where you left off and get back to the things you love."
      title="Welcome back"
      prompt="Don't have an account?"
      linkHref="/signup"
      linkLabel="Create one"
      submitLabel="Sign in"
      onSubmit={handleSubmit}
    >
      <AuthInput
        id="email"
        label="Email address"
        type="email"
        placeholder="Enter your email"
      />
      <AuthInput
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
      />
    </AuthForm>
  );
}