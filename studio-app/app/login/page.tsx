import type { Metadata } from "next";
import AuthShell from "../components/AuthShell";
import LoginForm from "../components/LoginForm";
import purplePhotoStudio from "../../public/images/purple-photo-studio.jpg";

export const metadata: Metadata = {
  title: "Login — StudioSpace",
  description:
    "Sign in to your StudioSpace account and continue your creative journey.",
};

const benefits = [
  "Manage your bookings",
  "List your studio spaces",
  "Explore premium studios",
];

export default function LoginPage() {

  const handleRegistrationForm =(e:React.SubmitEvent<HTMLElement>)=>{
    e.preventDefault()

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const user = Object.fromEntries(formData.entries())

    console.log(user)

  }



  return (
    <AuthShell
      title={
        <>
          Welcome <span className="text-purple-400">Back!</span>
        </>
      }
      subtitle="Sign in to your StudioSpace account and continue your creative journey."
      benefits={benefits}
      topNote="Don't have an account?"
      topLinkLabel="Register"
      topLinkHref="/register"
      image={purplePhotoStudio}
      imageAlt="Studio with purple lighting and a filmmaker"
      imageClassName="object-left"
    >
      <LoginForm />
    </AuthShell>
  );
}
