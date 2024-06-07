import { Header } from "@/components/header";
import { Icon } from "@/components/icon";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Header title="Home" href="/sing-in" iconName="appointment" iconClassName="w-5 h-5">
        <div className="inline-flex gap-[10px] items-center">
          <Image src="/logo-doctorme.png" alt="DoctorMe" width={48} height={48}/>
          <span className="font-bold text-3xl">DoctorMe</span>
        </div>
      </Header>
      
      <h1 className="font-bold text-xl"> Assistente pessoal <span className="w-full flex">para agendar consultas</span></h1>

      <div className="flex w-full gap-4">

        <div className="bg-green-600 inline-flex p-3 rounded-xl">
          <div className="text-white font-roboto">
            <h2 className="font-semibold">Agendamento hoje</h2>
            <p className="text-xs">10:00 - Clínico geral</p>
          </div>
        </div>

      </div>

    </div>
  );
}
