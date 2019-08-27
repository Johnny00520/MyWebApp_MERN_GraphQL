import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './CustomNavbar.scss';

const navbarPaths = [
    { path: '/home', main: "Home"},
    { path: '/about', main: "About"},
    { path: '/skills', main: "Skills"},
    { path: '/experiences', main: "Experiences"},
    { path: '/projects', main: "Projects" },
    { path: '/contact', main: "Contact"}
]

const CustomNavbar = (props) => {
    return (
        <header className="navbar">
            <nav className="navbar_container">

                <div className="navbar_title">
                    <Link to="/">
                        JC
                    </Link>
                </div>

                <div className="spacer" />

                <div className="navbar_items">
                    <ul>
                        {navbarPaths.map((navbarPath) => (
                            <Link to={navbarPath.path} key={navbarPath.path}>
                                <button>
                                    {navbarPath.main}
                                </button>
                            </Link>
                        ))}
                    </ul>
                </div>

            </nav>
        </header>
    )
}

export default withRouter(CustomNavbar);
