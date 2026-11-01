"use client"

import Link from "next/link";
import { Popover } from "@base-ui/react/popover";
import { authClient } from "../lib/auth-client";

const NavUserInfo = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="hidden h-10 w-10 animate-pulse rounded-full bg-white/10 md:block" />
    );
  }

  const user = session?.user;

  if (!user) {
    return null;
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label="Open account menu"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-purple-500/15 text-sm font-bold text-purple-300 ring-1 ring-purple-500/40 transition-colors hover:bg-purple-500/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
      >
        {(user.name ?? "U").charAt(0).toUpperCase()}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner align="end" sideOffset={10}>
          <Popover.Popup className="w-56 rounded-xl border border-white/10 bg-[#191324] p-4 shadow-[0_25px_70px_rgba(0,0,0,0.5)] outline-none">
            <div className="flex flex-col">
              <p className="truncate text-sm font-semibold text-white">
                {user.name}
              </p>
              <p className="mt-0.5 truncate text-xs text-white/50">
                {user.email}
              </p>
            </div>
            <Link
              href="/profile"
              className="mt-4 flex rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-2.5 text-center text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              My Profile
            </Link>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default NavUserInfo;
