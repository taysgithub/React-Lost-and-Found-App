// React
import { useContext } from "react";
// Compontent
import { ComposeContext } from "../Context/ComposeContext";

const useCompose = () => {
    return useContext(ComposeContext);
}

export default useCompose;