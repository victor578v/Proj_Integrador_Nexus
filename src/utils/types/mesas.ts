import { ImagemI } from "./imagens";
import { MensagemI } from "./mensagens";
import { PersonagemI } from "./personagens";
import { UsuarioI } from "./usuarios";

export interface MesaI {
  id: number;
  nome: string;
  sistema: string;
  descricao: string; // Nova propriedade para descrição
  dono: UsuarioI; // Referência ao usuário que é o dono da mesa
  userId: number; // ID do usuário
  mensagens: MensagemI[]; // Lista de mensagens associadas à mesa
  personagens: PersonagemI[]; // Lista de personagens associados à mesa
  imagem: ImagemI; // Referência à imagem da mesa
  imagemId: number; // ID da imagem, garantindo que cada mesa tenha apenas uma imagem
}
