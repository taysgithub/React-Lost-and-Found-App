// Component
import { Posts } from "../Posts";
// Scss
import "./MyPosts.scss";
// Hook
import useAuth from "../../../Hook/useAuth";

export const MyPosts = () => {

    const {
        user,
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
        </div>
    )
}