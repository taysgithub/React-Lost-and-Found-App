
import { Post } from "./Post/Post"
import "./Posts.scss";

// Hook
import usePosts from '../../Hook/usePosts';
import useAuth from '../../Hook/useAuth';

export const Posts = (props) => {
    const {posts} = usePosts();   
    const {
        user,
        setUser,
        signUp,
        signIn,
        sign_out,
        isSignUp,
        setIsSignUp,
        isSignIn,
        setIsSignIn,
        toggleMode
    } = useAuth(); 
    const isMyPosts = (props.mode === "mine");
    const isAllPosts = (props.mode === "all");

    return (
        <div className="cards">
            { isMyPosts && 
                posts?.map(
                    (post, index) => {
                        if(post.userId === user?.uid){
                            return(
                                <Post 
                                key={index}
                                post={post}
                                mode = {props.mode}
                            />
                            )
                        }
                    }
                )
            }
            { isAllPosts &&   
                posts?.map(
                    (post, index) => (
                        <Post 
                            key={index}
                            post={post}
                            mode = {props.mode}
                        />
                    )
                )
            }
        </div>
    )
}