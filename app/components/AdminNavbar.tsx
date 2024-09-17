import React from "react";
import Link from "next/link";
import Image from "next/image";

const AdminNavbar = () => {
  const menu = [
    {
      name: "Ogłoszenia",
      link: "/admin/announcements",
      image: "/assets/icons/paper.png",
    },
    {
      name: "Aplikacje",
      link: "/admin/aplication",
      image: "/assets/icons/people.png",
    },
    {
      name: "Dokumenty Rekrutacjne",
      link: "/admin/importantdocuments",
      image: "/assets/icons/docs-wait.png",
    },
    {
      name: "Użytkownicy (w przygotowaniu)",
      link: "/admin/users",
      image: "/assets/icons/users.png",
    },
    {
      name: "Pracownicy (w przygotowaniu)",
      link: "/admin/workers",
      image: "/assets/icons/worker.png",
    },
    {
      name: "Raporty (w przygotowaniu)",
      link: "/admin/reports",
      image: "/assets/icons/reports.png",
    },
  ];
  return (
    <div className="w-full h-full border-r-[1px] border-black flex flex-col">
      {menu.map((item, i) => (
        <Link
          href={item.link}
          key={`${item.name}-${item.link}`}
          className={`${
            menu.length - 1 === i
              ? "border-none"
              : "border-b-[1px] border-black"
          } hover:bg-gray-300`}
        >
          <div className="flex p-3 items-center justify-start gap-4">
            <Image src={item.image} height={34} width={34} alt="menuIcon" />
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdminNavbar;
