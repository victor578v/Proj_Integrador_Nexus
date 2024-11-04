import { MesaI } from "./mesas";
import { UsuarioI } from "./usuarios";

export interface PersonagemI {
  id: number;
  nickname: string;
  vidaMaxima: number;
  vidaAtual: number;
  usuario: UsuarioI;
  userId: number;
  mesa: MesaI;
  mesaId: number;
}
