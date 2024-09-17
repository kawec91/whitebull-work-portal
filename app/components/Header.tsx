"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  // const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  // useEffect(() => {
  //   const myProviders = async () => {
  //     const response: any = await getProviders();

  //     setProviders(response);
  //   };

  //   myProviders();
  // }, []);
  return (
    <div className="h-[100px] px-4 border-b-[1px] border-black flex items-center justify-between">
      <div className="flex items-center justify-center gap-4">
        <Link href="/">
          <Image
            width={150}
            height={150}
            src={"/assets/images/logo.png"}
            alt="WhiteBull logo"
            className="object-contain"
          />
        </Link>
        <h3 className="text-2xl sm:flex hidden">Praca w WhiteBull.</h3>
      </div>
      <div className="flex items-center justify-center">
        {session?.user ? (
          <div className="items-center justify-center gap-4 sm:flex hidden">
            <Link href={`/profile`} className="black_btn">
              Profil
            </Link>
            <button
              onClick={() => signOut()}
              type="button"
              className="outline_btn"
            >
              Wyloguj
            </button>
            <Link href={"/profile"}>
              <Image
                src={`${session?.user.image}`}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            <Link href={"/auth/login"}>Zaloguj</Link>
            {/* <button
                                type='button'
                        
                                onClick={()=> signIn()}
                                className={"black_btn"}
                                >
                                    Zaloguj
                                </button> */}
            {/* {providers && 
                        Object.values(providers).map((provider) => (
                            <button
                                type='button'
                                key={provider.name}
                                onClick={()=> signIn(provider.id)}
                                className={"black_btn"}
                                >
                                    Zaloguj
                                </button>
                        ))
                    } */}
          </>
        )}
      </div>

      {/* Mobile Navigation */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex flex-col gap-2 absolute right-0 top-full w-full rounded-lg bg-white min-w-[210px] justify-end items-end -mt-3">
            <Image
              src={"/assets/images/logo.png"}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            />

            {toggleDropdown && (
              <div className="p-5 w-full flex flex-col items-end">
                <Link
                  href={"/profile"}
                  onClick={() => setToggleDropdown(false)}
                >
                  Mój Profil
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Wyloguj
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* {providers && 
                    Object.values(providers).map((provider) => (
                        <button
                            type='button'
                            key={provider.name}
                            onClick={()=> signIn(provider.id)}
                            className="black_btn"
                            >
                                Zaloguj
                            </button>
                    ))
                } */}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
