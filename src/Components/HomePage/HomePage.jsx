import "./HomePage.scss";
import { Footer } from "../Footer/Footer";

import { Cards } from "../Cards/Cards";

export const HomePage = () => {

    return (
        <div className="homepage">
            <div className="home-main">
                <h3>All Posts</h3>
                <Cards 
                    mine={false}
                    mode = "all"
                />
            </div>
            <Footer />
        </div>
    )
}