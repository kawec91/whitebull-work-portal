"use client";

import Tiptap from "@/app/components/Tiptap";
import Link from "next/link";
import React, { useState } from "react";

const NewAnnouncements = () => {
  const [content, setContent] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    salary: "",
    image: "",
    video: "",
    description: "",
    location: "",
  });

  const textInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  // const textAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  //   console.log(formData);
  // };

  const handleContentChange = (res: string) => {
    setContent(res);

    setFormData((prevData) => ({
      ...prevData,
      description: `${res}`,
    }));
    console.log("cccc", content);
    console.log("handleContentChange", formData);
  };

  const inputStyle = `w-full border border-black p-2 rounded-md`;
  const labelStyle = `w-1/5`;
  const divStyle = `flex gap-4 w-full items-center`;
  return (
    <div className="w-full">
      <form
        className="p-4 flex flex-col items-start justify-center gap-4"
        action={"/api/admin/announcements/new"}
        method="POST"
        encType="multipart/form-data"
      >
        <div className={`${divStyle}`}>
          <label className={labelStyle} htmlFor="title">
            Tytuł:
          </label>
          <input
            className={inputStyle}
            name="title"
            id="title"
            onChange={(e) => textInputHandler(e)}
            placeholder="Wpisz tytuł..."
            required
          />
        </div>
        <div className={`${divStyle}`}>
          <label className={labelStyle} htmlFor="salary">
            Wynagrodzenie (np. 21-22):
          </label>
          <div className="flex w-full items-center gap-4">
            <input
              className={inputStyle}
              name="salary"
              id="salary"
              onChange={(e) => textInputHandler(e)}
              placeholder="Wpisz tylko wartości z myślnikiem np. 21-22"
              required
            />
            <p> H/Brutto</p>
          </div>
        </div>
        <div className={`${divStyle}`}>
          <label className={labelStyle} htmlFor="image">
            Zdjęcie (Kafelek)
          </label>
          <input type="file" name="image" id="image" className={inputStyle} />
        </div>
        <div className={`${divStyle} hidden`}>
          <label className={labelStyle} htmlFor="video">
            Video:
          </label>
          <input type="file" name="video" id="video" className={inputStyle} />
        </div>

        <div className={`${divStyle}`}>
          <label className={labelStyle} htmlFor="description">
            Opis:
          </label>
          <input
            className="hidden"
            type="text"
            name="description"
            id="description"
            value={content}
          />
          <Tiptap
            initialContent={content}
            onChange={(newContent: string) => handleContentChange(newContent)}
          />
        </div>
        <div className={`${divStyle}`}></div>
        <div className="flex w-full justify-end items-center gap-4">
          <Link href="/admin">Anuluj</Link>
          <button
            type="submit"
            className="py-2 px-6 rounded-full bg-red-500 text-white"
          >
            {false ? "..." : "Dodaj ogłoszenie"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAnnouncements;
