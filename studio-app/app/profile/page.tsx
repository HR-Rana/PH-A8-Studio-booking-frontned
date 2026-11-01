"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "../lib/auth-client";
import { toast } from "@/components/ui/toast";

export default function ProfilePage() {


  const {data:session, isPending, error} = authClient.useSession();


   
    if(error){
        toast.error(error.message)
        return <p>faild to load session</p>

    }

    const user = session?.user;


  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-black"
          >
            ← Back to Home
          </Link>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Profile Card */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500" />

          {/* User Info */}
          <div className="px-6 pb-7 sm:px-8">
            <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gray-100 text-3xl font-bold text-indigo-600 shadow-sm">
                  {user?.name.charAt(0).toUpperCase()}
                </div>

                <div className="pb-1">
                  <h2 className="text-xl font-bold text-gray-900">
                    {user?.name}
                  </h2>
                  <p className="text-sm text-gray-500">{user?.role}</p>
                </div>
              </div>

              <button
                type="button"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-gray-50"
              >
               Logout
              </button>
            </div>

            {/* Personal Information */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h3>

              <div className="mt-4 divide-y divide-gray-100 rounded-xl border border-gray-200">
                <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-gray-500">Full Name</span>
                  <span className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </span>
                </div>

                <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-gray-500">Email Address</span>
                  <span className="break-all text-sm font-medium text-gray-900">
                    {user?.email}
                  </span>
                </div>

                {/* <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-gray-500">Account Type</span>
                  <span className="text-sm font-medium text-gray-900">
                    {user.role}
                  </span>
                </div>

                <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-gray-500">Member Since</span>
                  <span className="text-sm font-medium text-gray-900">
                    {user.joinedDate}
                  </span>
                </div> */}
              </div>
            </div>

           
          </div>
        </section>

    
      </div>
    </main>
  );
}