import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import '../styles/Layout.css';
const Layout = () => {

    const pathName  = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathName])

    return(
        <div id="layoutContainer">
            <header>
                <nav id="navBar">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="courses">Courses</Link>
                        </li>
                        <li>
                            <Link to="about">About</Link>
                        </li>
                        {/*todo: conditionally render Link to Login vs. link to Profile*/}
                        <li>
                            <Link to="login">Sign In / Sign Up</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <Outlet />
            <footer id="footer">
                <p>This website is unaffiliated with Dalhousie University. The accuracy of any information on this site cannot be guaranteed.</p>
                <p>To do: add contact link</p>
            </footer>
        </div>
    )
}

export default Layout;