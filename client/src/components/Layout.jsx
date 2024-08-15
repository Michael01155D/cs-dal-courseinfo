import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import '../styles/Layout.css';
import { AuthContext } from "../contexts";
import { logout } from "../connections/users";
const Layout = () => {
    const { user, setUser }  = useContext(AuthContext);
    const navigate = useNavigate();
    const pathName  = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathName])

    const signOut = async () => {
        await logout(user);
        setUser(null);
        navigate('/');
    }

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
                            {
                                user ?
                                <>
                                    <li>
                                        <Link to="userProfile">{user.username}</Link>
                                    </li>
                                    <li>
                                        <button id='logoutButton' onClick={() => signOut()}>Sign Out</button>
                                    </li>
                                </>
                                :
                                 <li>
                                    <Link to="login">Login</Link>
                                </li>
                            }
                    </ul>
                </nav>
            </header>
            <Outlet />
            <footer id="footer">
                <p>This website is unaffiliated with Dalhousie University. The accuracy of any information on this site cannot be guaranteed.</p>
            </footer>
        </div>
    )
}

export default Layout;