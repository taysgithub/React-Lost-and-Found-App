import { useState, createContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.scss';
import { app, db, auth, storage, storageRef, upload, getDownloadUrl, uploadResumable } from "./firebase";
import { TopBar } from "./Components/Top-Bar/Top-Bar";
import { Authentication } from "./Components/Authentication/Authentication";
import { HomePage } from "./Components/HomePage/HomePage";
import { Compose } from "./Components/Compose/Compose";
import { MyPosts } from "./Components/Posts/My-Posts/MyPosts";
import { PageNotFound } from "./Components/PageNotFound/Page-Not-Found";
import { LoadingPage } from "./Components/Loading-Page/Loading-Page";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";


export const AppContext = createContext();

function App() {

  const [authState, loading] = useAuthState(auth);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  
  const navigate = useNavigate();

  const q = query(collection(db, "posts"), orderBy('timestamp'));

  const subscribePosts = () => {
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
          if(querySnapshot.docs.length !== 0){
            await setPosts(querySnapshot.docs.map((doc, index) => {
                  return {
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
                  }
            }).reverse());
          }
      })
  }

  useEffect(() => {
    subscribePosts(); 
  }, [authState]);

  return (
    <div className="app">
      <AppContext.Provider value={{app, user, setUser, auth, navigate, storage, db, storageRef, upload, getDownloadUrl, uploadResumable, posts, setPosts, authState, loading}}>
          <div className="top-bar">
            <TopBar />
          </div>
          <div className="main">
            <Routes>
              <Route path="/" element={loading ? <LoadingPage /> : <HomePage />} />
              <Route path="/auth" element={authState ? <HomePage /> : <Authentication location=''/>} />
              <Route path="/compose" element={loading ? <LoadingPage /> : <Compose mode='newPost'/> } />
              <Route path="/myposts" element={loading ? <LoadingPage /> : authState ? <MyPosts /> : <PageNotFound />} />
              <Route path="/loading" element={<LoadingPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
