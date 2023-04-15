// React
import { useContext } from "react";
// Component
import { PostsContext } from "../Context/PostsContext";

const usePosts = () => {
    return useContext(PostsContext);
}

export default usePosts;