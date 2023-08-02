// React
import { useState, createContext, useEffect } from 'react';
import { useLocation } from "react-router-dom";

// Firebase
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Hook
import useApp from '../Hook/useApp';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const {
        navigate,
    } = useApp();

    const [user, setUser] = useState(null);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [isSignUp, setIsSignUp] = useState(true);
    const [isSignIn, setIsSignIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setIsSignIn(!isSignIn);
    }

    const signUp = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password).then(
            userCredential => {
                // navigate(`/${prop.location}`);
            }
        ).catch (e => {
            alert(`${e.code}: ${e.message}`);
        });
    }

    const signIn = (email, password) => {        
        signInWithEmailAndPassword(auth, email, password).then(
            userCredential => {
                // navigate(`/${prop.location}`);
            }
        ).catch(e => {
            alert(`${e.code}: ${e.message}`);
        })
    }

    const sign_out = () => {
        signOut(auth).then(() => {
            // setUser(null);
            // alert("You are signed out");
        }).catch(e => {
            alert(`${e.code}: ${e.message}`);
        })
    }

    useEffect( () => {
        setIsLoading(true)
        auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            setUser(authUser);
            setIsLoading(false);
            navigate(from, {replace: true});
        });
    }, []);

    return(
        <AuthContext.Provider value={{
            user,
            setUser,
            signUp,
            signIn,
            sign_out,
            isSignUp,
            setIsSignUp,
            isSignIn,
            setIsSignIn,
            toggleMode,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}