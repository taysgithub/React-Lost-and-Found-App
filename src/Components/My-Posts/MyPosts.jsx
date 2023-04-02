import { AppContext } from "../../App"
import { useContext } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { Cards } from "../Cards/Cards";
import "./MyPosts.scss";

export const MyPosts = () => {
    const {auth} = useContext(AppContext);
    const [authState] = useAuthState(auth);

    return (
        <div className="myPosts">
            <h3>My Posts</h3>
            { authState &&
                <Cards 
                    userId={authState.uid}
                    // mine={true}
                    mode = "mine"
                />
            }
        </div>
    )
}