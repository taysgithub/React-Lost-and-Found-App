import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import { CardSingle } from "./Card/Card"
import { db } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, onSnapshot, query } from "firebase/firestore";
import "./Cards.scss";

export const Cards = (props) => {
    const {auth, posts, setPosts} = useContext(AppContext);
    const [authState] = useAuthState(auth);
    const isMyPosts = (props.mode === "mine");
    const isAllPosts = (props.mode === "all");
    const[isLoading, setIsLoading] = useState(false);

    const q = query(collection(db, "posts"));

    const subscribePosts = () => {
        
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            if(querySnapshot.docs.length !== 0){
                setIsLoading(true);
                await setPosts(querySnapshot.docs.map((doc, index) => ({
                    postId: doc.id,
                    userId: doc.data().userId,
                    description: doc.data().description,
                    name: doc.data().name,
                    timestamp: doc.data().timestamp,
                    photoUrls: doc.data().photoUrls,
                    photoDirectories: doc.data().photoDirectories,
                    phone: doc.data().phone,
                    email: doc.data().email,
                    key: index
                })).sort((a, b) => b.timestamp - a.timestamp ));
                setIsLoading(false);
            }
        })
    }

    useEffect(() => {
        subscribePosts(); 
    }, []);

    return (
        <div className="cards">
            { isMyPosts && 
                posts.map(
                    (post, index) => {
                        if(post.userId === authState.uid){
                            return(
                                <CardSingle 
                                key={index}
                                post={post}
                                mode = {props.mode}
                                isLoading={isLoading}
                            />
                            )
                        }
                    }
                )
            }
            { isAllPosts &&
                posts.map(
                    (post, index) => (
                        <CardSingle 
                            key={index}
                            post={post}
                            mode = {props.mode}
                            isLoading={isLoading}
                        />
                    )
                )
            }
        </div>
    )
}
// if(post.userId === authState.uid)