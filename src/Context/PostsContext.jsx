// React
import { createContext, useEffect, useState } from "react";
// Firebase
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export const PostsContext = createContext();

export const PostsProvider = ({children}) => {

    const [posts, setPosts] = useState(null);
    const [isLoadingImg, setIsLoadingImg] = useState(false);

    const q = query(collection(db, "posts"), orderBy('timestamp'));

    const subscribePosts = () => {
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        if(querySnapshot.docs.length !== 0){
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
          })).reverse());
        }
      });
    }
    
    useEffect(() => {
      subscribePosts(); 
    }, []);

    return (
        <PostsContext.Provider value={{
            posts,
            setPosts,
            isLoadingImg, 
            setIsLoadingImg,
        }}>
            {children}
        </PostsContext.Provider>
    )
}
