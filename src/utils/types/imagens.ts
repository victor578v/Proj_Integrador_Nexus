import { MesaI } from "./mesas";

export interface ImagemI {
    id: number;             // ID único da imagem
    url: string;          // URL da imagem armazenada (opcional)
    mesas?: MesaI[];       // Lista de mesas associadas a esta imagem, se necessário
  }
  