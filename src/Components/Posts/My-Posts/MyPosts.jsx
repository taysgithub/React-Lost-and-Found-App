import { AppContext } from "../../../App"
import { useContext } from 'react';
import { Posts } from "../Posts";
import { Footer } from "../../Footer/Footer";
import "./MyPosts.scss";

export const MyPosts = () => {
    const {authState} = useContext(AppContext);

    return (
        <div className="myPosts">
            <div className="myPosts-main">
            <h3>My Posts</h3>
                { authState &&
                    <Posts 
                        userId={authState.uid}
                        // mine={true}
                        mode = "mine"
                    />
                }
            </div>
            <Footer />
        </div>
    )
}