"use client";

import Link from "next/link";
import React, { useState } from "react";
import * as actions from "../actions/index";

export default function AuthRegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const inputStyle = `w-full border border-black p-2 rounded-md`;
  const divStyle = `flex gap-2 w-full flex-col`;

  // const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (formData.password === formData.confirmPassword) {
      actions.registerUser(formData);
      setFormData(formData);
    }
  };
  return (
    <>
      <form className="flex flex-col items-center justify-center gap-4 p-8">
        <div className={divStyle}>
          <label htmlFor="">Imie:</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
            className={inputStyle}
          />
        </div>
        <div className={divStyle}>
          <label htmlFor="">Nazwisko:</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            required
            className={inputStyle}
          />
        </div>
        <div className={divStyle}>
          <label htmlFor="">E-mail:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className={inputStyle}
          />
        </div>
        <div className={divStyle}>
          <label htmlFor="">Hasło:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className={inputStyle}
          />
        </div>
        <div className={divStyle}>
          <label htmlFor="">Potwierdź hasło:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            className={inputStyle}
          />
        </div>
        <button
          className="py-2 px-6 bg-red-700 uppercase text-white rounded-full font-bold"
          onClick={(e: React.MouseEvent<HTMLElement>) => handleSubmit(e)}
        >
          Rejestracja
        </button>
        <p>
          Masz już konto?{" "}
          <Link href={"/auth/login"} className="text-blue-700">
            Zaloguj się
          </Link>
          .
        </p>
      </form>
    </>
  );
}
