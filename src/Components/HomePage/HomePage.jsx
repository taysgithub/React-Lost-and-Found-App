// Scss
import "./HomePage.scss";
// Compnent
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";

export const HomePage = () => {

    return (
        <div className="homepage">
            <Outlet />
            <Footer />
        </div>
    )
}