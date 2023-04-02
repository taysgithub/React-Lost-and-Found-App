import "./HomePage.scss";
import { Footer } from "../Footer/Footer";
import { Posts } from "../Posts/Posts";

export const HomePage = () => {

    return (
        <div className="homepage">
            <div className="home-main">
                <h3>All Posts</h3>
                <Posts 
                    mine={false}
                    mode = "all"
                />
            </div>
            <Footer />
        </div>
    )
}