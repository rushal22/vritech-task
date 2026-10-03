"use client";

import { useState, type SubmitEvent } from "react";
import AuthForm, { AuthInput } from "./AuthForm";
import { createUser } from "../services/userService";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const formData = new FormData(event.currentTarget);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      setMessage("Those passwords don't match. Please try again.");
      return;
    }

    const user = {
      username: formData.get("fullName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    localStorage.setItem(
      "authUser",
      JSON.stringify({ username: user.username, email: user.email }),
    );

    createUser(user).then((res) => {
      if (res) {
        router.push("/");
      }
    });
  }

  return (
    <AuthForm
      topMsg="Good things, closer"
      panelTitle="Make room for what you love."
      panelDescription="Create an account to keep your favorites and make checkout a little easier."
      title="Create your account"
      prompt="Already have an account?"
      linkHref="/login"
      linkLabel="Sign in"
      submitLabel="Create account"
      message={message}
      onSubmit={handleSubmit}
    >
      <AuthInput
        id="fullName"
        label="Full name"
        type="text"
        placeholder="Your name"
      />
      <AuthInput
        id="email"
        label="Email address"
        type="email"
        placeholder="Enter your email"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <AuthInput
          id="password"
          label="Password"
          type="password"
          placeholder="At least 8 characters"
        />
        <AuthInput
          id="confirmPassword"
          label="Confirm password"
          type="password"
          placeholder="Enter it again"
        />
      </div>
    </AuthForm>
  );
}
