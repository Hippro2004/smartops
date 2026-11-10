'use client';

import { api } from '@/src/lib/core/api';
import { tokens } from '@/src/lib/auth/auth';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export interface Me {
    username: string;
    email: string;
    firstname: string;
    surname: string;
    contact: string;
    roles: string[];
}

interface AuthContextValue {
    me: Me | null;
    loading: boolean;
    refreshMe: () => Promise<Me | null>;
    clear: () => void;
}

const AuthContext = createContext<AuthContextValue>({
    me: null,
    loading: true,
    refreshMe: async () => null,
    clear: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [me, setMe] = useState<Me | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshMe = useCallback(async () => {

        if (!tokens.access()) {
            setMe(null);
            setLoading(false);
            return null;
        }

        try {
            const { data } = await api.get<Me>('/users/me');
            setMe(data);
            return data;
        } catch {
            setMe(null);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const clear = useCallback(() => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        setMe(null)
    }, []);

    useEffect(() => {
        refreshMe();
    }, [refreshMe]);

    return (
        <AuthContext.Provider value={{ me, loading, refreshMe, clear }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
export const isAdmin = (me: Me | null) => !!me?.roles.includes('ADMIN');