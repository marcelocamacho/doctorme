import { Icon } from "@/components/icon";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href="/sign-in">Login</Link>
      <Icon name="eye-off" className="w-6 h-6 fill-red-400"/>

      <Icon name='eye-on' className="w-6 h-6 fill-red-400" childrenClassName="text-sm text-red-400">Aberto</Icon>
    </>
    
  );
}
