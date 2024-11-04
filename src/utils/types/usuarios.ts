import { MensagemI } from "./mensagens";
import { MesaI } from "./mesas";
import { PersonagemI } from "./personagens";

export interface UsuarioI {
  id: number;
  nome: string;
  email: string;
  senha: string;
  mesas: MesaI[];
  personagens: PersonagemI[];
  mensagens: MensagemI[];
}