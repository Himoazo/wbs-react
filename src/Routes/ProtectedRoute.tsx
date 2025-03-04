import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../Context/AuthContext";

interface Props { children: ReactNode }

const ProtectedRoute: React.FC<Props> = ({children}) => {
    
    const { user, loading } = useAuth();

    if (loading) {
        return; 
    }

    if (!user) {
        return <Navigate to="/login" replace/>
    }

    return (<>{children}</>)
}

export default ProtectedRoute;