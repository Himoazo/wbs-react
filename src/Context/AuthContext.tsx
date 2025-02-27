import { createContext, useState, useContext, ReactNode, useEffect} from "react";
import { User, Login, /* AuthRes, */ AuthContext } from "../Interfaces/Auth";

const AuthenticateContext = createContext<AuthContext | null>(null);

interface AuthProps { children: ReactNode }

export const AuthProvider: React.FC<AuthProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    const login =async (loginData: Login) => {
        
        try {
            const response = await fetch("http://localhost:5114/api/account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            if (!response.ok) {
                throw new Error("Det gick inte att logga in");
            }

            const data = await response.json() as User;

            localStorage.setItem("token", data.token);
            setUser(data);
           
        } catch (error) {
            throw error;
        }
    }

    const logout = () => {
        localStorage.removeItem("token");

        setUser(null);
    }

    const validateToken = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        try {
            const response = await fetch("http://localhost:5114/api/account/me", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser({Username: data.username, email: data.email, token: data.token});
                
            }
        } catch (error) {
            localStorage.removeItem("token");
            setUser(null);
        }
    }

    useEffect(() => {
        validateToken();
    }, [user]);


    return (
        <AuthenticateContext.Provider value={{login, logout, user}}>
            {children}
        </AuthenticateContext.Provider>
    )
}

export const useAuth = () :AuthContext => {
    const context = useContext(AuthenticateContext);

    if (!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
}

