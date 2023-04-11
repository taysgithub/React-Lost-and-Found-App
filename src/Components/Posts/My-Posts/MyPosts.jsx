import { Posts } from "../Posts";
import { Footer } from "../../Footer/Footer";
import "./MyPosts.scss";

// Hook
import useAuth from "../../../Hook/useAuth";

export const MyPosts = () => {

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

    console.log(user.uid)

    return (
        <div className="myPosts">
            <div className="myPosts-main">
            <h3>My Posts</h3>
                { user &&
                    <Posts 
                        userId={user.uid}
                        mode = "mine"
                    />
                }
            </div>
            {/* <Footer /> */}
        </div>
    )
}