"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { IconEye, IconEyeOff, IconLock } from "./AuthIcons";

export function Field({
  type,
  name,
  placeholder,
  icon,
}: {
  type: string;
  name: string;
  placeholder: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#241b33] px-4 py-3.5 focus-within:border-purple-500/70">
      {icon}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full min-w-0 bg-transparent text-sm text-white placeholder:text-gray-400 focus:outline-none"
      />
    </div>
  );
}

export function PasswordField({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#241b33] px-4 py-3.5 focus-within:border-purple-500/70">
      <IconLock className="h-5 w-5 text-gray-400" />
      <input
        type={visible ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        className="w-full min-w-0 bg-transparent text-sm text-white placeholder:text-gray-400 focus:outline-none"
      />
      <button
        type="button"
        onClick={() => setVisible((value) => !value)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="text-gray-400 transition-colors hover:text-purple-400"
      >
        {visible ? <IconEye className="h-5 w-5" /> : <IconEyeOff className="h-5 w-5" />}
      </button>
    </div>
  );
}
