import React, { useContext, useState } from 'react';
// import { Link, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { Menu } from 'semantic-ui-react';
import './CustomNavbar.scss';

const navbarPaths = [
    { path: '/about', name: "about"},
    { path: '/skills', name: "skills"},
    { path: '/experiences', name: "experiences"},
    { path: '/projects', name: "projects" },
    { path: '/adminlayout', name: "admin"},
    { path: '/contact', name: "contact"}
]

const loginNavbarPaths = [
    { path: '/about', name: "about"},
    { path: '/skills', name: "skills"},
    { path: '/experiences', name: "experiences"},
    { path: '/projects', name: "projects" },
    { path: '/contact', name: "contact"}
]

const CustomNavbar = (props) => {

    const { user, logout } = useContext(AuthContext);

    const pathname = window.location.pathname;
    const path = pathname === "/" ? 'home' : pathname.substr('/');

    const [activeItem, setActiveItem] = useState(path);
    const handleItemClick = (e, { name }) => setActiveItem(name);

    const menuBar = user ? (
        <header className="navbar">
            <Menu 
                pointing
                secondary
                size="massive"
                color="teal"
            >
                <Menu.Item
                    name={user.lastname}
                    active={path === "home"}
                    as={Link}
                    to="/"
                />

                <Menu.Menu position="right">
                    {loginNavbarPaths.map((loginNavbarPath) => 
                        <Menu.Item
                            key={loginNavbarPath.name}
                            name={loginNavbarPath.name}
                            onClick={handleItemClick}
                            
                            as={Link}
                            to={loginNavbarPath.path}
                            active={activeItem === loginNavbarPath.name}
                        />
                    )}
                    <Menu.Item
                        name="logout"
                        onClick={logout}
                    />
                </Menu.Menu>
            </Menu>
        </header>
    ) : ( 
    <header className="navbar">
        <Menu 
            pointing
            secondary
            size="massive"
            color="teal"
        >
            <Menu.Item
                name="JC"
                active={activeItem === "home"}
                
                onClick={handleItemClick}
                as={Link}
                to="/"
            />

            <Menu.Menu position="right">
                {navbarPaths.map((navbarPath) => 
                    <Menu.Item
                        key={navbarPath.name}
                        name={navbarPath.name}
                        active={activeItem === navbarPath.name}
                        onClick={handleItemClick}
                        as={Link}
                        to={navbarPath.path}

                    />
                )}
            </Menu.Menu>
        </Menu>
    </header>)

    return menuBar

    // return (
    //     <header className="navbar">
    //         <nav className="navbar_container">

    //             <div className="navbar_title">
    //                 <Link to="/">
    //                     JC
    //                 </Link>
    //             </div>

    //             <div className="spacer" />

    //             <div className="navbar_items">
    //                 <ul>
    //                     {navbarPaths.map((navbarPath) => (
    //                         <Link to={navbarPath.path} key={navbarPath.path}>
    //                             <button>
    //                                 {navbarPath.main}
    //                             </button>
    //                         </Link>
    //                     ))}
    //                 </ul>
    //             </div>
    //         </nav>
    //     </header>

    // )
}

// export default withRouter(CustomNavbar);
export default CustomNavbar
