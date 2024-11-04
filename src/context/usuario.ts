import { create } from 'zustand';
import { UsuarioI } from '../utils/types/usuarios';

const usuarioInicial: UsuarioI = {
  id: 0,
  nome: '',
  email: '',
  senha: '',
  mesas: [],
  personagens: [],
  mensagens: [],
};

type UsuarioStore = {
  usuario: UsuarioI;
  logaUsuario: (usuarioLogado: UsuarioI) => void;
  deslogaUsuario: () => void;
};

export const useUsuarioStore = create<UsuarioStore>((set) => ({
  usuario: usuarioInicial,
  logaUsuario: (usuarioLogado) => set({ usuario: usuarioLogado }),
  deslogaUsuario: () => set({ usuario: usuarioInicial }), // Resets to initial value
}));

