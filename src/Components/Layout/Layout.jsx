// Scss
import "./Layout.scss";
// React
import { Outlet } from "react-router-dom";
// Components
import { TopBar } from "../Top-Bar/Top-Bar";

export const Layout = () => {
    return (
        <main className="App">
            <div className="top-bar">
                <TopBar />
            </div>
            <div className="main">
                <Outlet />
            </div>
        </main>
    )
}