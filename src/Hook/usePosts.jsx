import { useContext } from "react";
import { PostsContext } from "../Context/PostsContext";

const usePosts = () => {
    return useContext(PostsContext);
}

export default usePosts;