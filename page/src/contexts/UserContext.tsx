import { createContext, useContext, useState, FC, ReactNode } from 'react';

// Definir a interface para o contexto de usuário
interface UserContextType {
  username: string;
  setUsername: (username: string) => void;
}

// Criar o contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provedor de contexto
export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>('');

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('UserContext Error');
  }
  return context;
};
