import type { Metadata } from "next";
import AuthShell from "../components/AuthShell";
import RegisterForm from "../components/RegisterForm";
import filmSetDirector from "../../public/images/film-set-director.jpg";

export const metadata: Metadata = {
  title: "Register — StudioSpace",
  description:
    "Create your StudioSpace account to book or list creative studios.",
};

const benefits = [
  "Book studios with ease",
  "List your creative space",
  "Be part of a creative community",
];

export default function RegisterPage() {


  
  return (
    <AuthShell
      title={
        <>
          Create Your
          <br />
          <span className="text-purple-400">Account</span>
        </>
      }
      subtitle="Join StudioSpace and start exploring or listing studios today."
      benefits={benefits}
      topNote="Already have an account?"
      topLinkLabel="Login"
      topLinkHref="/login"
      image={filmSetDirector}
      imageAlt="Film studio with a director chair under purple lighting"
      imageClassName="object-[center_60%]"
      overlay={<div className="absolute inset-0 bg-purple-600 mix-blend-hue" />}
    >
      <RegisterForm />
    </AuthShell>
  );
}
