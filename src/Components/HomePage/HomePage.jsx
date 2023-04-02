import "./HomePage.scss";

import { Cards } from "../Cards/Cards";

export const HomePage = () => {

    return (
        <div className="homepage">
            <h3>All Posts</h3>
            <Cards 
                mine={false}
                mode = "all"
            />
        </div>

    )
}