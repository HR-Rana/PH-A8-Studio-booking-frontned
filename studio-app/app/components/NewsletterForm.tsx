"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      className="mt-5 flex max-w-sm items-center gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        setEmail("");
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email address"
        aria-label="Email address"
        className="w-full min-w-0 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-gray-500 transition-colors focus:border-purple-500/70 focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:from-purple-500 hover:to-purple-400"
      >
        Subscribe
      </button>
    </form>
  );
}
