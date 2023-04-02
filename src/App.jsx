import { useState, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.scss';
import { app, db, auth, storage, storageRef, upload, getDownloadUrl, uploadResumable } from "./firebase";
import { TopBar } from "./Components/Top-Bar/Top-Bar";
import { Authentication } from "./Components/Authentication/Authentication";
import { HomePage } from "./Components/HomePage/HomePage";
import { Compose } from "./Components/Compose/Compose";
import { MyPosts } from "./Components/My-Posts/MyPosts";
import { PageNotFound } from "./Components/PageNotFound/Page-Not-Found";
import { useAuthState } from "react-firebase-hooks/auth";

export const AppContext = createContext();

function App() {

  const [authState] = useAuthState(auth);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  
  const navigate = useNavigate();

  return (
    <div className="app">
      <AppContext.Provider value={{app, user, setUser, auth, navigate, storage, db, storageRef, upload, getDownloadUrl, uploadResumable, posts, setPosts, authState}}>
          <div className="top-bar">
            <TopBar />
          </div>
          <div className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={authState ? <HomePage /> : <Authentication location=''/>} />
              <Route path="/compose" element={<Compose mode='newPost'/>} />
              <Route path="/myposts" element={authState ? <MyPosts /> : <PageNotFound />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
