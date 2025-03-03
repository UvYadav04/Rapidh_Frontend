'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    loginStatus: number;
    setLoginStatus: (status: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [loginStatus, setLoginStatus] = useState<number>(1);

    return (
        <AuthContext.Provider value={{ loginStatus, setLoginStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
