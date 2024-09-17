"use client";

import Link from "next/link";
import React, { useState } from "react";
import * as actions from "../actions/index";

interface AnnoucementEditFormProps {
  ann: {
    id: number;
    title: string;
    salary: string;
    image: string;
    video: string;
    description: string;
    location: string;
  };
}

export default function AnnoucementEditForm({ ann }: AnnoucementEditFormProps) {
  const [title, setTitle] = useState<string>(ann.title);
  const [salary, setSalary] = useState<string>(ann.salary);
  const [image, setImage] = useState<string | null>(ann.image);
  const [video, setVideo] = useState<string | null>(ann.video);
  const [description, setDescription] = useState<string>(ann.description);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("id", ann.id.toString());
    formData.append("title", title);
    formData.append("salary", salary);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
      setImage(image);
    }

    if (video) {
      formData.append("video", video);
      setVideo(video);
    }

    actions.annoucmentEdit(formData);
  };

  const inputStyle = `w-full border border-black p-2 rounded-md`;
  const labelStyle = `w-1/5`;
  const divStyle = `flex gap-4 w-full items-center`;
  return (
    <>
      <form
        className="p-4 flex flex-col items-start justify-center gap-4"
        onSubmit={handleSubmit}
      >
        <div className={`${divStyle}`}>
          <label className={labelStyle} htmlFor="title">
            Tytuł:
          </label>
          <input
            className={inputStyle}
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
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
              onChange={(e) => setSalary(e.target.value)}
              value={salary}
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
          <textarea
            className="w-full border border-black rounded-md h-52 p-2"
            name="description"
            value={description}
            id="description"
            placeholder="Wpisz treść ogłoszenia..."
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex w-full justify-end items-center gap-4">
          <Link href="/admin">Anuluj</Link>
          <button
            type="submit"
            className="py-2 px-6 rounded-full bg-red-500 text-white"
          >
            {false ? "..." : "Aktualizuj"}
          </button>
        </div>
      </form>
    </>
  );
}
