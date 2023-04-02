import { useContext } from 'react';
import { AppContext } from '../../App';
import { Post } from "./Post/Post"
import "./Posts.scss";

export const Posts = (props) => {
    const { authState, posts} = useContext(AppContext);
    
    const isMyPosts = (props.mode === "mine");
    const isAllPosts = (props.mode === "all");

    return (
        <div className="cards">
            { isMyPosts && 
                posts?.map(
                    (post, index) => {
                        if(post.userId === authState?.uid){
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