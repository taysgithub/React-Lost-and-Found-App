import { useContext } from "react";
import { ComposeContext } from "../Context/ComposeContext";

const useCompose = () => {
    return useContext(ComposeContext);
}

export default useCompose;