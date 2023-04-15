// React
import { useContext } from "react";
// Component
import { AuthContext } from "../Context/AuthContext";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;