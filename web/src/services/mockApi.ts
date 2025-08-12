import { 
  mockSetores, 
  mockImpressoras, 
  mockRegistros, 
  mockUsuario 
} from '@/data/mockData';
import type { 
  Setor, 
  Impressora, 
  RegistroImpressao, 
  Usuario, 
  DashboardMetrics 
} from '@/types';

// Simula delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Mock para Setores
export const setoresApi = {
  getAll: async (): Promise<Setor[]> => {
    await delay(500);
    return mockSetores;
  },

  getById: async (id: string): Promise<Setor | null> => {
    await delay(300);
    return mockSetores.find(s => s.id === id) || null;
  },

  create: async (setor: Omit<Setor, 'id' | 'createdAt' | 'updatedAt'>): Promise<Setor> => {
    await delay(800);
    const newSetor: Setor = {
      ...setor,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockSetores.push(newSetor);
    return newSetor;
  },

  update: async (id: string, updates: Partial<Setor>): Promise<Setor> => {
    await delay(800);
    const index = mockSetores.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Setor não encontrado');
    
    mockSetores[index] = {
      ...mockSetores[index],
      ...updates,
      updatedAt: new Date()
    };
    return mockSetores[index];
  },

  delete: async (id: string): Promise<void> => {
    await delay(600);
    const index = mockSetores.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Setor não encontrado');
    mockSetores.splice(index, 1);
  }
};

// API Mock para Impressoras
export const impressorasApi = {
  getAll: async (): Promise<Impressora[]> => {
    await delay(500);
    return mockImpressoras;
  },

  getById: async (id: string): Promise<Impressora | null> => {
    await delay(300);
    return mockImpressoras.find(i => i.id === id) || null;
  },

  create: async (impressora: Omit<Impressora, 'id' | 'createdAt' | 'updatedAt'>): Promise<Impressora> => {
    await delay(800);
    const newImpressora: Impressora = {
      ...impressora,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockImpressoras.push(newImpressora);
    return newImpressora;
  },

  update: async (id: string, updates: Partial<Impressora>): Promise<Impressora> => {
    await delay(800);
    const index = mockImpressoras.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Impressora não encontrada');
    
    mockImpressoras[index] = {
      ...mockImpressoras[index],
      ...updates,
      updatedAt: new Date()
    };
    return mockImpressoras[index];
  },

  delete: async (id: string): Promise<void> => {
    await delay(600);
    const index = mockImpressoras.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Impressora não encontrada');
    mockImpressoras.splice(index, 1);
  }
};

// API Mock para Registros
export const registrosApi = {
  getAll: async (): Promise<RegistroImpressao[]> => {
    await delay(500);
    return mockRegistros;
  },

  getByImpressora: async (impressoraId: string): Promise<RegistroImpressao[]> => {
    await delay(400);
    return mockRegistros.filter(r => r.impressoraId === impressoraId);
  },

  create: async (registro: Omit<RegistroImpressao, 'id' | 'createdAt'>): Promise<RegistroImpressao> => {
    await delay(600);
    const newRegistro: RegistroImpressao = {
      ...registro,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    mockRegistros.unshift(newRegistro);
    return newRegistro;
  }
};

// API Mock para Dashboard
export const dashboardApi = {
  getMetrics: async (): Promise<DashboardMetrics> => {
    await delay(700);
    
    const impressorasAtivas = mockImpressoras.filter(i => i.status === 'ativa');
    const impressorasInativas = mockImpressoras.filter(i => i.status === 'inativa');
    
    // Calcular impressões do mês atual
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const registrosMes = mockRegistros.filter(r => r.data >= startOfMonth);
    
    const impressoesColoridoMes = registrosMes
      .filter(r => r.tipo === 'colorida')
      .reduce((sum, r) => sum + r.quantidade, 0);
    
    const impressoesPretoBrancoMes = registrosMes
      .filter(r => r.tipo === 'pretoBranco')
      .reduce((sum, r) => sum + r.quantidade, 0);

    // Ranking das impressoras mais usadas
    const impressoraStats = mockImpressoras.map(impressora => {
      const totalImpressoes = mockRegistros
        .filter(r => r.impressoraId === impressora.id)
        .reduce((sum, r) => sum + r.quantidade, 0);
      
      return { impressora, totalImpressoes };
    });
    
    const rankingImpressoras = impressoraStats
      .sort((a, b) => b.totalImpressoes - a.totalImpressoes)
      .slice(0, 5);

    // Últimos registros
    const ultimosRegistros = mockRegistros
      .slice(0, 10)
      .map(registro => ({
        ...registro,
        impressora: mockImpressoras.find(i => i.id === registro.impressoraId)!
      }));

    return {
      totalImpressoras: mockImpressoras.length,
      impressorasAtivas: impressorasAtivas.length,
      impressorasInativas: impressorasInativas.length,
      impressoesColoridoMes,
      impressoesPretoBrancoMes,
      rankingImpressoras,
      ultimosRegistros
    };
  }
};

// API Mock para Usuário
export const usuarioApi = {
  getCurrentUser: async (): Promise<Usuario> => {
    await delay(300);
    return mockUsuario;
  }
};