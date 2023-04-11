// React
import { Routes, Route } from "react-router-dom";
// Scss
import './App.scss';
// Components
import { RequireAuth } from "./Components/RequireAuth";
import { Layout } from "./Components/Layout/Layout";
import { TopBar } from "./Components/Top-Bar/Top-Bar";
import { Authentication } from "./Components/Authentication/Authentication";
import { HomePage } from "./Components/HomePage/HomePage";
import { AllPosts } from "./Components/All-Posts/All-Posts";
import { Compose } from "./Components/Compose/Compose";
import { MyPosts } from "./Components/Posts/My-Posts/MyPosts";
import { PageNotFound } from "./Components/PageNotFound/Page-Not-Found";
import { LoadingPage } from "./Components/Loading-Page/Loading-Page";
// Hook
import useAuth from "./Hook/useAuth";

function App() {

  const {
    user,
    isLoading,
  } = useAuth();
  
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Public Routes */}
          <Route path="" element={isLoading ? <LoadingPage /> : <HomePage />}>
          <Route path="" element={isLoading ? <LoadingPage /> : <AllPosts />}/>
          </Route>
          <Route path="auth" element={<Authentication location=''/>}/>

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path='/' element={isLoading ? <LoadingPage /> : <HomePage />}>
              <Route path="" element={isLoading ? <LoadingPage /> : <AllPosts />}/>
              <Route path="myposts" element={isLoading ? <LoadingPage /> :  <MyPosts />} />
              <Route path="compose" element={isLoading ? <LoadingPage /> : <Compose mode='newPost'/> } />
            </Route>
          </Route>

          {/* Catch All */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>



      {/* <div className="top-bar">
        <TopBar />
      </div>
      <div className="main">
        <Routes>
          <Route path="/" element={isLoading ? <LoadingPage /> : <HomePage />} />
          <Route path="/auth" element={user ? <HomePage /> : <Authentication location=''/>} />
          <Route path="/compose" element={isLoading ? <LoadingPage /> : <Compose mode='newPost'/> } />
          <Route path="/myposts" element={isLoading ? <LoadingPage /> : user ? <MyPosts /> : <PageNotFound />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div> */}
    </div>
  );
}

export default App;
