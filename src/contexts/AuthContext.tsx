import { createContext, ReactNode, useState, useEffect } from 'react';

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router';

import { toast } from 'react-toastify';

type AuthContextData = {
    users: UsersProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UsersProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData)


export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch {
        console.log('erro ao deslogar')
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [users, setUser] = useState<UsersProps>()
    const isAuthenticated = !!users;

    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies();

        if (token) {
            api.get('/about').then(response => {
                const { id, name, email } = response.data;

                setUser({
                    id,
                    name,
                    email
                })
            })
                .catch(() => {
                    //Se deu erro, deslogamos o usuário.
                    signOut();
                })
        }
    }, [])

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            })
            // console.log(response.data);

            const { id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
                path: "/" // Quais caminhos terao acesso ao cookie
            })

            setUser({
                id,
                name,
                email,
            })

            //Passar para proximas requisiçoes o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Logado com sucesso!', {
                theme: "colored"
            })

            //Redirecionar o user para /dashboard
            Router.push('/dashboard')


        } catch (err) {
            toast.error("Erro ao acessar!", {
                theme: "colored"
            })
            console.log("ERRO AO ACESSAR ", err)
        }
    }
    async function signUp({ name, email, password }: SignUpProps) {
        try {
            const response = await api.post('/users', {
                name,
                email,
                password
            })

            toast.success("Cadastrado com sucesso!", {
                theme: "colored"
            })

            Router.push('/')
        } catch (err) {
            toast.error("Erro ao cadastrar!", {
                theme: "colored"
            })
            console.log("erro ao tentar cadastrar", err)
        }
    }

    return (
        <AuthContext.Provider value={{ users, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}