"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "../../lib/auth-client";
import { IconLogout } from "../AuthIcons";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message ?? "Failed to log out");
      return;
    }

    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex shrink-0 items-center gap-2 rounded-full border border-red-500/40 px-4 py-2 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/10 sm:px-5"
    >
      <IconLogout className="h-4 w-4" />
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
}
