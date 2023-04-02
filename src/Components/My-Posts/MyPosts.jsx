import { AppContext } from "../../App"
import { useContext } from 'react';
import { Cards } from "../Cards/Cards";
import { Footer } from "../Footer/Footer";
import "./MyPosts.scss";

export const MyPosts = () => {
    const {authState} = useContext(AppContext);

    return (
        <div className="myPosts">
            <div className="myPosts-main">
            <h3>My Posts</h3>
                { authState &&
                    <Cards 
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