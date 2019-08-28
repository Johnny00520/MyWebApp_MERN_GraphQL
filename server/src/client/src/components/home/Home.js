import React, { PureComponent } from 'react';
import About from '../about/About';
// import gql from 'graphql-tag';
// import { Query } from 'react-apollo';

// import Navbar from '../customNavbar/CustomNavbar';

import './Home.scss';

// https://res.cloudinary.com/dqvawqnkh/image/upload/v1566792045/homepage_background/homepage.gif

// const HOMEPAGE_IMG_QUERY = gql`
//     query HomepageBkImg{
//         homepage_bk_img {
//             url
//         }
//     }
// `;



export default class Home extends PureComponent {
    render() {
        // console.log(React.version)

        return (
            <div className="homepage">
                <div className="homepage-container">
                    
                    <div className="homepage_wrapper">

                        <div className="homepage_myname">Johnny Cheng</div>

                        <div className="homepage_subtitle">
                            I am a System Engineer at Charter Communications
                        </div>
                        <div className="my_social_info">

                            <div className="social_media_icons">It's a test now</div>
                        </div>

                    </div>

                </div>

                <About />
            </div>
        )
    }
}
