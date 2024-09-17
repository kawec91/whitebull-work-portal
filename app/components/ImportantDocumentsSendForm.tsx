"use client";
import React, { useState } from "react";

export default function ImportantDocumentsSendForm() {
  const [formData, setFormData] = useState({
    document: "",
  });
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("id", formData);
  };
  return (
    <form
      action={"/api/admin/importantdocuments/add"}
      method="POST"
      encType="multipart/form-data"
      className="w-full h-[75px] flex items-center justify-start border-b-[1px] border-black px-4"
    >
      <input
        type="file"
        name="document"
        onChange={(e) => inputChangeHandler(e)}
        required
      />
      <button
        type="submit"
        className="border-[1px] border-black px-4 py-2 rounded-xl"
      >
        Dodaj plik
      </button>
    </form>
  );
}
