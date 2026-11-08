'use client';

import { api } from '@/src/lib/api';
import { tokens } from '@/src/lib/auth';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export interface Me {
    username: string;
    email: string;
    firstname: string;
    surname: string;
}

interface AuthContextValue {
    me: Me | null;
    loading: boolean;
    refreshMe: () => Promise<void>;
    clear: () => void;
}

const AuthContext = createContext<AuthContextValue>({
    me: null,
    loading: true,
    refreshMe: async () => { },
    clear: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [me, setMe] = useState<Me | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshMe = useCallback(async () => {
        if (!localStorage.getItem('access_token')) {
            setMe(null);
            setLoading(false);
            return;
        }

        if (!tokens.access()) {
            setMe(null);
            setLoading(false);
            return;
        }

        try {
            const { data } = await api.get<Me>('/users/me');
            setMe(data);
        } catch {
            setMe(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const clear = useCallback(() => setMe(null), []);

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