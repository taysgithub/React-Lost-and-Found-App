import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const useApp = () => {
    return useContext(AppContext);
}

export default useApp;