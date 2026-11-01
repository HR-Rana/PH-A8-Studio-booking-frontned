import LogoutButton from "./LogoutButton";
import type { DashboardUser } from "./DashboardOverview";

export default function ProfileCard({ user }: { user: DashboardUser }) {
  const displayName = user.name || "StudioSpace User";

  return (
    <section className="overflow-hidden rounded-2xl border border-white/5 bg-[#191324]">
      <div className="h-28 bg-gradient-to-r from-purple-900 via-purple-600 to-purple-500 sm:h-32" />

      <div className="px-6 pb-7 sm:px-8">
        <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-[#191324] bg-purple-500/10 text-3xl font-bold text-purple-400">
              {displayName.charAt(0).toUpperCase()}
            </div>

            <div className="pb-1">
              <h2 className="text-xl font-bold text-white">{displayName}</h2>
              <p className="text-sm text-white/50">{user.role ?? "member"}</p>
            </div>
          </div>

          <LogoutButton />
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white">
            Personal Information
          </h3>

          <div className="mt-4 divide-y divide-white/5 rounded-xl border border-white/5">
            <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm text-white/50">Full Name</span>
              <span className="text-sm font-medium text-white">
                {displayName}
              </span>
            </div>

            <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm text-white/50">Email Address</span>
              <span className="break-all text-sm font-medium text-white">
                {user.email || "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
