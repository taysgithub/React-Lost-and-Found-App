// React
import { useContext } from "react";
// Component
import { AppContext } from "../Context/AppContext";

const useApp = () => {
    return useContext(AppContext);
}

export default useApp;