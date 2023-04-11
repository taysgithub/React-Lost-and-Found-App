// Scss
import "./All-Posts.scss";
// Components
import { Posts } from "../Posts/Posts";

export const AllPosts = () => {
    return (
        <div className="all-posts">
            <h3>All Posts</h3>
            <Posts 
                mine={false}
                mode = "all"
            />
        </div>
    )
}