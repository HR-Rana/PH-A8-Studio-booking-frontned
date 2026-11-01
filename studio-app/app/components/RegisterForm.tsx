
"use client"
import { useState } from "react";
import { Field, PasswordField } from "./AuthFields";
import {
  IconArrow,
  IconGitHub,
  IconGoogle,
  IconMail,
  IconUser,
  IconUserPlus,
  IconXLogo,
} from "./AuthIcons";

import { toast } from "react-toastify";
import { authClient } from "../lib/auth-client";
import { redirect } from "next/navigation";

const socialButtons = [
  {
    label: "Continue with Google",
    icon: <IconGoogle className="h-5 w-5" />,
  },
  {
    label: "Continue with GitHub",
    icon: <IconGitHub className="h-5 w-5 text-white" />,
  },
  {
    label: "Continue with X",
    icon: <IconXLogo className="h-4 w-4 text-white" />,
  },
];

export default function RegisterForm() {
  const [pass, setMatchPass] = useState(false)
  
  const handleRegistrationForm =async (e:React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault()

    const formData = new FormData(e.target)
    const userData = Object.fromEntries(formData.entries()) as {fullName:string, email:string, password:string, confirmPassword:string}
    let password = userData.password;
    let confirmPass = userData.confirmPassword;


    if (userData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    

    if(password !== confirmPass){
      setMatchPass(true)
      alert("password filed is not matched..!")
      return
    }


    const {data, error } = await authClient.signUp.email({
     name:userData.fullName,
    email:userData.email,
    password:userData.password,
      
    });

    if(data){
      toast.success(`${data.user.name} Registrated Successfully..!`)
      redirect("/")
    }
    if(error){
      toast.error(error.message)
    }
    
    console.log(userData)


  }


  return (
    <div className="w-full max-w-[420px] rounded-3xl border border-white/10 bg-[#191324]/80 p-6 shadow-[0_25px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8">
      <div className="flex items-center gap-3">
        <IconUserPlus className="h-7 w-7 text-purple-500" />
        <h2 className="text-xl font-bold text-white">Register Now</h2>
      </div>

      <form
        className="mt-6 space-y-4"
        onSubmit={handleRegistrationForm}
      >
        <Field
          type="text"
          name="name"
          placeholder="Full Name"
          icon={<IconUser className="h-5 w-5 text-gray-400" />}
        />
        <Field
          type="email"
         
          name="email"
          placeholder="Email Address"
          icon={<IconMail className="h-5 w-5 text-gray-400" />}
        />
        <PasswordField name="password" placeholder="Password" />
        <PasswordField name="confirmPassword" placeholder="Confirm Password" />
        
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(147,51,234,0.45)] transition-transform hover:scale-[1.02]"
        >
          Create Account
          <IconArrow className="h-4 w-4" />
        </button>
        {/* {
          pass ? <p className="text-red-600">{"Please type same password "}</p>: " "
        } */}
      </form>

      <div className="mt-6 space-y-5">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/60">or sign up with</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {socialButtons.map((social) => (
            <button
              key={social.label}
              type="button"
              aria-label={social.label}
              className="grid h-12 place-items-center rounded-xl border border-white/10 bg-[#251d33] transition-colors hover:border-purple-500/50"
            >
              {social.icon}
            </button>
          ))}
        </div>

        <p className="pt-1 text-center text-sm leading-relaxed text-white/60">
          By creating an account, you agree to our{" "}
          <a
            href="#"
            className="text-purple-300 transition-colors hover:text-purple-200"
          >
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-purple-300 transition-colors hover:text-purple-200"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
