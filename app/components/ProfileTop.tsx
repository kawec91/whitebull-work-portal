"use client";

import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";

export default function ProfileTop() {
  const { data: session } = useSession();
  return (
    <>
      {session?.user ? (
        <>
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              height={192}
              width={192}
              className="bg-slate-500 border-black rounded-full"
              alt="profile-image"
            />
          ) : (
            <Image
              src={""}
              height={192}
              width={192}
              className="bg-slate-500 border-black rounded-full"
              alt="profile-image"
            />
          )}
          <h4 className="text-2xl font-bold py-2">{session?.user?.name}</h4>
          <div className="w-1/4 py-4">
            <hr className="border-[2px] border-black" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <label className="text-lg">E-mail:</label>
            <p className="text-lg">{session?.user?.email}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <label className="text-lg">Hasło:</label>
            <p className="text-lg">************</p>
            {/* <button className="text-blue-700">Zmień</button> */}
          </div>
        </>
      ) : (
        <div className="w-full h-[calc(100vh_-_150px)] flex items-center justify-center">
          Zaloguj się aby zobaczyć profil.
        </div>
      )}
    </>
  );
}
