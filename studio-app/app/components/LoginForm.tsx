"use client";

import Link from "next/link";
import { useState } from "react";
import { Field, PasswordField } from "./AuthFields";
import {
  IconArrow,
  IconGitHub,
  IconGoogle,
  IconMail,
  IconUser,
  IconXLogo,
} from "./AuthIcons";
import { authClient } from "../lib/auth-client";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const socialButtons = [
  {
    label: "Continue with Google",
    tile: "bg-white",
    icon: <IconGoogle className="h-5 w-5" />,
  },
  {
    label: "Continue with GitHub",
    tile: "bg-[#251d33]",
    icon: <IconGitHub className="h-5 w-5 text-white" />,
  },
  {
    label: "Continue with X",
    tile: "bg-[#251d33]",
    icon: <IconXLogo className="h-4 w-4 text-white" />,
  },
];

export default function LoginForm() {
  const [remember, setRemember] = useState(true);

  const handleLoginForm = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();


    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries()) as Record<string, string>


    const { data, error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
    })


    if (data?.token) {
      toast.success(`Welcome MR. ${data.user.name}`)
     redirect("/profile")
    }
    
    if(error){
      toast.error(error.message)
    }


  }





  return (
    <div className="w-full max-w-[420px] rounded-3xl border border-white/10 bg-[#191324]/80 p-6 shadow-[0_25px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8">
      <div className="flex items-center gap-3">
        <IconUser className="h-7 w-7 text-purple-500" />
        <h2 className="text-xl font-bold text-white">Login to Your Account</h2>
      </div>

      <form
        className="mt-6 space-y-4"
        onSubmit={handleLoginForm}
      >
        <Field
          type="email"
          name="email"
          placeholder="Email address"
          icon={<IconMail className="h-5 w-5 text-gray-400" />}
        />
        <PasswordField name="password" placeholder="Password" />

        <div className="flex items-center justify-between pt-1">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-white/80">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="h-4 w-4 rounded accent-purple-500"
            />
            Remember me
          </label>
          <Link
            href="#"
            className="text-sm font-semibold text-purple-400 transition-colors hover:text-purple-300"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(147,51,234,0.45)] transition-transform hover:scale-[1.02]"
        >
          Login
          <IconArrow className="h-4 w-4" />
        </button>
      </form>

      <div className="mt-6 space-y-5">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/60">or continue with</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {socialButtons.map((social) => (
            <button
              key={social.label}
              type="button"
              aria-label={social.label}
              className={`grid h-12 place-items-center rounded-xl ring-1 ring-white/10 transition-all hover:ring-purple-500/50 ${social.tile}`}
            >
              {social.icon}
            </button>
          ))}
        </div>

        <p className="pt-1 text-center text-sm text-white/60">
          {"Don't have an account? "}
          <Link
            href="/register"
            className="inline-flex items-center gap-1 font-semibold text-purple-400 transition-colors hover:text-purple-300"
          >
            Register now
            <IconArrow className="h-3.5 w-3.5" />
          </Link>
        </p>
      </div>
    </div>
  );
}
