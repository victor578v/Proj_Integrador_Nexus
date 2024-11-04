import { MesaI } from "./mesas";
import { UsuarioI } from "./usuarios";

export interface MensagemI {
  id: number;
  conteudo: string;
  autor: UsuarioI;
  userId: number;
  mesa: MesaI;
  mesaId: number;
}

