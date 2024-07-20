import { Outlet, Link } from "react-router-dom";
import '../styles/Layout.css';
const Layout = () => {
    return(
        <div id="mainContainer">
            <header>
                <nav id="navBar">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="Courses">Courses</Link>
                        </li>
                        <li>
                            <Link to="About">About</Link>
                        </li>
                        {/*todo: conditionally render Link to Login vs. link to Profile*/}
                        <li>
                            <Link to="Login">Sign In</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <footer id="footer">
                <p>This website is unaffiliated with Dalhousie University. The accuracy of any information on this site cannot be guaranteed.</p>
                <p>To do: add contact link</p>
            </footer>
            <Outlet />
        </div>
    )
}

export default Layout;