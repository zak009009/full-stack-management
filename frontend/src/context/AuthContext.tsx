
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@campus.edu',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as UserRole,
    profileImage: '/avatars/admin.jpg'
  },
  {
    id: '2',
    email: 'dean@campus.edu',
    password: 'dean123',
    name: 'Dean Johnson',
    role: 'dean' as UserRole,
    department: 'Computer Science',
    profileImage: '/avatars/dean.jpg'
  },
  {
    id: '3',
    email: 'teacher@campus.edu',
    password: 'teacher123',
    name: 'Prof. Smith',
    role: 'teacher' as UserRole,
    department: 'Mathematics',
    profileImage: '/avatars/teacher.jpg'
  },
  {
    id: '4',
    email: 'registrar@campus.edu',
    password: 'registrar123',
    name: 'Jane Registrar',
    role: 'registrar' as UserRole,
    profileImage: '/avatars/registrar.jpg'
  },
  {
    id: '5',
    email: 'librarian@campus.edu',
    password: 'library123',
    name: 'Mark Librarian',
    role: 'librarian' as UserRole,
    profileImage: '/avatars/librarian.jpg'
  }
];

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('campus_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing saved user', e);
        localStorage.removeItem('campus_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Remove password before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Save to state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem('campus_user', JSON.stringify(userWithoutPassword));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('campus_user');
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userExists = MOCK_USERS.some(u => u.email === email);
      
      if (!userExists) {
        throw new Error('Email not found');
      }
      
      // In a real app, we would send a reset email here
      console.log(`Password reset link sent to ${email}`);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
