import Image from "next/image";
import styles from "./page.module.css";
import CriaMesa from "@/components/CriaMesa/criamesa";
import MesasDestaque from "@/components/MesasDestaque/mesasdestaque";
import MesasRecomendadas from "@/components/MesasRecomendadas/mesasrecomendadas";
import Mesas from "@/components/Mesas/mesas";
import Banner from "@/components/Banner/banner";
import Pesquisa from "@/components/Pesquisa/pesquisa";

export default function Home() {
  return (
    <>
      <Pesquisa />
      <Mesas>
        <MesasRecomendadas />
        <MesasDestaque />
        <CriaMesa />
      </Mesas>
      <Banner />
    </>
  );
}
