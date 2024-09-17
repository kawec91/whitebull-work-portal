"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import TiptapToolbar from "./TiptapToolbar";
import Underline from "@tiptap/extension-underline";

type TextEditorProps = {
  onChange: (content: string) => void;
  initialContent?: string;
};

const Tiptap = ({ onChange, initialContent }: TextEditorProps) => {
  // const handleChange = (newContent: string) => {
  //   onChange(newContent);
  //   //Set data
  //   const data = {
  //     content: content,
  //   };
  //   console.log("Tiptap", data);
  //   //Save in LocalStorage
  //   const existingDataString = localStorage.getItem("myData");
  //   const existingData = existingDataString
  //     ? JSON.parse(existingDataString)
  //     : [];
  //   const updatedData = data;
  //   localStorage.setItem("myData", JSON.stringify(updatedData));
  // };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc p-4",
        },
      }),
      ListItem,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className="w-full">
      <TiptapToolbar editor={editor} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default Tiptap;
