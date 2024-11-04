import { MesaI } from "./mesas";

export interface ImagemI {
    id: number;             // ID único da imagem
    tipo: string;          // Tipo da imagem (ex: image/jpeg)
    tamanho: number;       // Tamanho da imagem em bytes
    url?: string;          // URL da imagem armazenada (opcional)
    dados?: Uint8Array;    // Dados da imagem (opcional, armazenados como um array de bytes)
    descricao?: string;     // Descrição da imagem (opcional)
    mesas?: MesaI[];       // Lista de mesas associadas a esta imagem, se necessário
  }
  