import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Setor, Impressora, RegistroImpressao, Usuario } from '@/types';

// Estado global da aplicação
interface AppState {
  setores: Setor[];
  impressoras: Impressora[];
  registros: RegistroImpressao[];
  usuario: Usuario | null;
  loading: boolean;
}

// Ações do reducer
type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USUARIO'; payload: Usuario | null }
  | { type: 'SET_SETORES'; payload: Setor[] }
  | { type: 'ADD_SETOR'; payload: Setor }
  | { type: 'UPDATE_SETOR'; payload: Setor }
  | { type: 'DELETE_SETOR'; payload: string }
  | { type: 'SET_IMPRESSORAS'; payload: Impressora[] }
  | { type: 'ADD_IMPRESSORA'; payload: Impressora }
  | { type: 'UPDATE_IMPRESSORA'; payload: Impressora }
  | { type: 'DELETE_IMPRESSORA'; payload: string }
  | { type: 'SET_REGISTROS'; payload: RegistroImpressao[] }
  | { type: 'ADD_REGISTRO'; payload: RegistroImpressao };

// Estado inicial
const initialState: AppState = {
  setores: [],
  impressoras: [],
  registros: [],
  usuario: null,
  loading: false,
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USUARIO':
      return { ...state, usuario: action.payload };
    case 'SET_SETORES':
      return { ...state, setores: action.payload };
    case 'ADD_SETOR':
      return { ...state, setores: [...state.setores, action.payload] };
    case 'UPDATE_SETOR':
      return {
        ...state,
        setores: state.setores.map(s => s.id === action.payload.id ? action.payload : s)
      };
    case 'DELETE_SETOR':
      return {
        ...state,
        setores: state.setores.filter(s => s.id !== action.payload)
      };
    case 'SET_IMPRESSORAS':
      return { ...state, impressoras: action.payload };
    case 'ADD_IMPRESSORA':
      return { ...state, impressoras: [...state.impressoras, action.payload] };
    case 'UPDATE_IMPRESSORA':
      return {
        ...state,
        impressoras: state.impressoras.map(i => i.id === action.payload.id ? action.payload : i)
      };
    case 'DELETE_IMPRESSORA':
      return {
        ...state,
        impressoras: state.impressoras.filter(i => i.id !== action.payload)
      };
    case 'SET_REGISTROS':
      return { ...state, registros: action.payload };
    case 'ADD_REGISTRO':
      return { ...state, registros: [...state.registros, action.payload] };
    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de AppProvider');
  }
  return context;
};