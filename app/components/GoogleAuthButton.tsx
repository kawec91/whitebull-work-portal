import Image from "next/image";
import React from "react";
import GoogleIcon from "../../public/assets/icons/google-icon.png";
import Link from "next/link";

export default function GoogleAuthButton() {
  return (
    <Link href={""}>
      <Image src={GoogleIcon} alt="google-icon" />
      <div>Zaloguj przez Google</div>
    </Link>
  );
}
